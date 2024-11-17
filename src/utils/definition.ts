import React from "react";
import {JSONContent} from "@tiptap/react";

export interface NavItem {
  title: string;
  link: string;
  icon:React.JSX.Element | undefined
}

export interface SocialLinks {
  link: string;
  icon: React.JSX.Element;

}

export interface  Color {
  name: string;
  color: string;
  price:number
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  slug: string;
  features: string[];
  description: JSONContent;
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
  description: JSONContent;
  images: string[];
  created_at: string;
  price: number;
  colors: {
    name: string;
    color: string;
  }[];
  variants: VariantProduct[];
}
export interface VariantProduct {
  id:string
  stock: number;
  price: number;
  storage:string
  color:string
  color_name:string
}
