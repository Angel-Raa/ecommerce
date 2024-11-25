import React from "react";
import {Json} from "../supabase/supabase";

export interface NavItem {
    title: string;
    link: string;
    icon: React.JSX.Element | undefined
}

export interface SocialLinks {
    link: string;
    icon: React.JSX.Element;

}

export interface Color {
    name: string;
    color: string;
    price: number;
}

export interface VariantProduct {
    id: string;
    stock: number;
    price: number;
    storage: string;
    color: string;
    color_name: string;
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    slug: string;
    features: string[];
    description: Json;
    images: string[];
    created_at: string;
    variants: VariantProduct[];
}

export interface PreparedProducts {
    id: string;
    name: string;
    brand: string;
    slug: string;
    features: string[];
    description: Json;
    images: string[];
    created_at: string;
    price: number;
    colors: {
        name: string;
        color: string;
    }[];
    variants: VariantProduct[];
}

export interface ICartItem {
    variantId: string
    productId: string
    name: string
    color: string;
    storage: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Register {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
}

export interface Login {
    email: string;
    password: string;
}


export interface Order {
    address: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        postalCode?: string;
        country: string;
    };
    cartItems: {
        variantId: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
}