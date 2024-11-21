// Definición del enum para los estados
export enum OrderStatus {
    Pending = 'Pending',
    Paid = 'Paid',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
}

// Función para obtener el estado del pedido en español
export const getStatus = (status: OrderStatus): string => {
    const statusMap: Record<OrderStatus, string> = {
        [OrderStatus.Pending]: 'Pendiente',
        [OrderStatus.Paid]: 'Pagado',
        [OrderStatus.Shipped]: 'Enviado',
        [OrderStatus.Delivered]: 'Entregado',
    };

    return statusMap[status] || status;
};
