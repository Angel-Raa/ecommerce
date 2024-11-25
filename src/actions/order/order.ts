import {Order, OrderStatus} from "../../utils";
import {supabase} from "../../supabase/client";

export const createOrder = async (order: Order) => {

    // 1. Obtener el usuario autenticado + Cliente de tabla customer
    const {data, error: errorUser} = await supabase.auth.getUser();
    if (errorUser) {
        throw new Error(errorUser.message);
    }

    const userId = data.user?.id;
    const {
        data: cliente,
        error: errorCliente
    } = await supabase.from('customers').select('id').eq('user_id', userId).single()

    if (errorCliente) {
        throw new Error(errorCliente.message);
    }
    const clienteId = cliente.id;
    // 2. Verificar que haya stock suficiente para cada variante en el carrito

    for (const item of order.cartItems) {
        const {
            data: variantData,
            error
        } = await supabase.from('variants').select('stock').eq('id', item.variantId).single();

        if (error) {
            throw new Error(error.message);
        }
        if (variantData.stock < item.quantity) {
            throw new Error('No hay stock suficiente los artículos seleccionados');

        }

    }

    // 3. Guardar la dirección del envío
    const {data: addressData, error: addressError} = await supabase.from('addresses').insert({
        address_line1: order.address.addressLine1,
        address_line2: order.address.addressLine2,
        city: order.address.city,
        state: order.address.state,
        country: order.address.country,
        postal_code: order.address.postalCode,
        customer_id: clienteId
    }).select().single();
    if (addressError) {
        throw new Error(addressError.message);
    }

    // 4. Crear la orden

    const {data: orderData, error: orderError} = await supabase.from('orders').insert({
        customer_id: clienteId,
        address_id: addressData.id,
        total_amount: order.totalAmount,
        status: OrderStatus.Pending,
    }).select().single();
    if (orderError) {
        throw new Error(orderError.message);
    }

    // 5. Guardar los detalles de la orden
    const orderItem = order.cartItems.map(item => ({
        order_id: orderData.id,
        variant_id: item.variantId,
        quantity: item.quantity,
        price: item.price,
    }))

    const {error: orderItemError} = await supabase.from('order_items').insert(orderItem);
    if (orderItemError) {
        throw new Error(orderItemError.message);
    }


    // 6. Actualizar el stock de  las variantes

    for (const item of order.cartItems) {
        const {data: variant} = await supabase.from('variants').select('stock').eq('id', item.variantId).single()

        if (!variant) {
            throw new Error('No se encontro la variante')
        }
        const newStock = variant.stock - item.quantity;
        const {error: updateError} = await supabase.from('variants').update({
            stock: newStock
        }).eq('id', item.variantId);

        if (updateError) {
            throw new Error(
                `No se pudo actualizar el stock de la variante`
            );
        }
    }
    return orderData;
}