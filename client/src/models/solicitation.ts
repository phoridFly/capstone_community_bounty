export interface Solicitation {
	_id?: string;
	product_name: string;
	product_cost?: Number;
	cost_unit?: string;
	description: string;
	still_active?: boolean;
	still_available?: boolean;
	compost_heap?: boolean;
	food_pic?: string;
	seller_sub: string;
	seller_nickname?: string; 
	product_id?: string;
	address_id: string;
}