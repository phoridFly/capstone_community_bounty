import { Product_Type } from "./enums";

export interface Item {
  _id?: string,
	product_name: string,
	product_type: Product_Type
}


export interface Watchlist {
  _id?: string,
	product_name: string,
	product_type?: Product_Type
}