export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            graphql: {
                Args: {
                    operationName?: string
                    query?: string
                    variables?: Json
                    extensions?: Json
                }
                Returns: Json
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
    public: {
        Tables: {
            addresses: {
                Row: {
                    address_line1: string
                    address_line2: string | null
                    city: string
                    country: string
                    created_at: string
                    customer_id: string
                    id: string
                    postal_code: string | null
                    state: string
                }
                Insert: {
                    address_line1: string
                    address_line2?: string | null
                    city: string
                    country?: string
                    created_at?: string
                    customer_id: string
                    id?: string
                    postal_code?: string | null
                    state: string
                }
                Update: {
                    address_line1?: string
                    address_line2?: string | null
                    city?: string
                    country?: string
                    created_at?: string
                    customer_id?: string
                    id?: string
                    postal_code?: string | null
                    state?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "addresses_customer_id_fkey"
                        columns: ["customer_id"]
                        isOneToOne: false
                        referencedRelation: "customers"
                        referencedColumns: ["id"]
                    },
                ]
            }
            customers: {
                Row: {
                    created_at: string
                    email: string
                    full_name: string
                    id: string
                    phone: string | null
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    email: string
                    full_name: string
                    id?: string
                    phone?: string | null
                    user_id: string
                }
                Update: {
                    created_at?: string
                    email?: string
                    full_name?: string
                    id?: string
                    phone?: string | null
                    user_id?: string
                }
                Relationships: []
            }
            order_items: {
                Row: {
                    created_at: string
                    id: string
                    order_id: string
                    price: number
                    quantity: number
                    variant_id: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    order_id: string
                    price: number
                    quantity: number
                    variant_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    order_id?: string
                    price?: number
                    quantity?: number
                    variant_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "order_items_order_id_fkey"
                        columns: ["order_id"]
                        isOneToOne: false
                        referencedRelation: "orders"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "order_items_variant_id_fkey"
                        columns: ["variant_id"]
                        isOneToOne: false
                        referencedRelation: "variants"
                        referencedColumns: ["id"]
                    },
                ]
            }
            orders: {
                Row: {
                    address_id: string
                    created_at: string
                    customer_id: string
                    id: string
                    status: string
                    total_amount: number
                }
                Insert: {
                    address_id: string
                    created_at?: string
                    customer_id: string
                    id?: string
                    status?: string
                    total_amount: number
                }
                Update: {
                    address_id?: string
                    created_at?: string
                    customer_id?: string
                    id?: string
                    status?: string
                    total_amount?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "orders_address_id_fkey"
                        columns: ["address_id"]
                        isOneToOne: false
                        referencedRelation: "addresses"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "orders_customer_id_fkey"
                        columns: ["customer_id"]
                        isOneToOne: false
                        referencedRelation: "customers"
                        referencedColumns: ["id"]
                    },
                ]
            }
            products: {
                Row: {
                    brand: string
                    created_at: string
                    description: Json
                    features: string[]
                    id: string
                    images: string[]
                    name: string
                    slug: string
                }
                Insert: {
                    brand: string
                    created_at?: string
                    description: Json
                    features: string[]
                    id?: string
                    images: string[]
                    name: string
                    slug: string
                }
                Update: {
                    brand?: string
                    created_at?: string
                    description?: Json
                    features?: string[]
                    id?: string
                    images?: string[]
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            user_role: {
                Row: {
                    created_at: string
                    id: string
                    role: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    role: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    role?: string
                    user_id?: string
                }
                Relationships: []
            }
            variants: {
                Row: {
                    color: string
                    color_name: string
                    id: string
                    price: number
                    product_id: string
                    stock: number
                    storage: string
                }
                Insert: {
                    color: string
                    color_name: string
                    id?: string
                    price: number
                    product_id: string
                    stock: number
                    storage: string
                }
                Update: {
                    color?: string
                    color_name?: string
                    id?: string
                    price?: number
                    product_id?: string
                    stock?: number
                    storage?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "variants_product_id_fkey"
                        columns: ["product_id"]
                        isOneToOne: false
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
            Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
            PublicSchema["Views"])
        ? (PublicSchema["Tables"] &
            PublicSchema["Views"])[PublicTableNameOrOptions] extends {
                Row: infer R
            }
            ? R
            : never
        : never

export type TablesInsert<
    PublicTableNameOrOptions extends | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Insert: infer I
        }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
                Insert: infer I
            }
            ? I
            : never
        : never

export type TablesUpdate<
    PublicTableNameOrOptions extends | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Update: infer U
        }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
                Update: infer U
            }
            ? U
            : never
        : never

export type Enums<
    PublicEnumNameOrOptions extends | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
        ? PublicSchema["Enums"][PublicEnumNameOrOptions]
        : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends | keyof PublicSchema["CompositeTypes"]
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
            schema: keyof Database
        }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
        ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
        : never
