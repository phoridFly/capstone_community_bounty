import { Message_Log } from './message';

export interface SolicitsPlusTransactions {
	_id?: string;
	product_name?: string;
	product_cost?: Number;
	cost_unit?: string;
	description?: string;
	still_active?: boolean;
	still_available?: boolean;
	food_pic?: string;
	product_id?: string;
	buyer_review_verbose?: string;
	buyer_review_numeric?: number;
	seller_review_verbose?: string;
	seller_review_numberic?: number;
	completed?: boolean;
	buyer_sub?: string;
	buyer_nickname?: string;
	seller_sub?: string;
	seller_nickname: string;
	solicitation_id: string;
	message_log: {
		[key: string]: Message_Log
	}; 
	error?: string;
}