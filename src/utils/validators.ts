import { JSONContent } from "@tiptap/react";
import { z } from "zod";

const isContentEmpty = (value: JSONContent): boolean => {
  if (!value || !Array.isArray(value.content) || value.content.length === 0) {
    return true;
  }

  return !value.content.some(
    (node) =>
      node.type === "paragraph" &&
      node.content &&
      Array.isArray(node.content) &&
      node.content.some(
        (textNode) =>
          textNode.type === "text" &&
          textNode.text &&
          textNode.text.trim() !== ""
      )
  );
};
export const userRegisterSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  fullName: z.string().min(1, "El nombre completo es requerido"),
  phone: z.string().optional(),
});

export const formSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  brand: z.string().min(1, "La marca del producto es obligatoria"),
  slug: z
    .string()
    .min(1, "El slug del producto es obligatorio")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  features: z.array(
    z.object({
      value: z.string().min(1, "La característica no puede estar vacía"),
    })
  ),
  description: z.custom<JSONContent>((value) => !isContentEmpty(value), {
    message: "La descripción no puede estar vacía",
  }),
  variants: z
    .array(
      z.object({
        id: z.string().optional(),
        stock: z.number().min(1, "El stock debe ser mayor a 0"),
        price: z.number().min(0.01, "El precio debe ser mayor a 0"),
        storage: z.string().min(1, "El almacenamiento es requerido"),
        color: z
          .string()
          .regex(
            /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|(rgb|hsl)a?\(\s*([0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\))$/,
            "El color debe ser un valor válido en formato hexadecimal, RGB o HSL"
          ),
        colorName: z.string().min(1, "El nombre del color es obligatorio"),
      })
    )
    .min(1, "Debe haber al menos una variante"),
  images: z.array(z.any()).min(1, "Debe haber al menos una imagen"),
});

export const addressSchema = z.object({
  addressLine1: z
    .string()
    .min(1, "La dirección es requerida")
    .max(50, "La dirección no debe exceder los 50 carácteres"),
  addressLine2: z
    .string()
    .max(50, "La dirección no debe exceder los 50 carácteres")
    .optional(),
  city: z
    .string()
    .min(1, "La ciudad es requerida")
    .max(30, "La ciudad no debe exceder los 30 carácteres"),
  state: z
    .string()
    .min(1, "El estado es requerido")
    .max(30, "El estado no debe exceder los 30 carácteres"),
  postalCode: z
    .string()
    .max(10, "El código postal no debe exceder los 10 carácteres")
    .optional(),
  country: z.string().min(1, "El país es requerido"),
});

export type FormValues = z.infer<typeof formSchema>;
export type AddressFormValues = z.infer<typeof addressSchema>;
export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
