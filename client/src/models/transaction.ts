import { Message_Log } from './message';
export interface Transaction {
	_id?: string;
	buyer_review_verbose?: string;
	buyer_review_numeric?: number;
	seller_review_verbose?: string;
	seller_review_numberic?: number;
	completed?: boolean;
	buyer_sub?: any;
	buyer_nickname?: string;
	seller_sub?: string;
	seller_nickname?: string;
	solicitation_id: string;
	person_sub?: string;
	mess?: string;
	message_log?: {
		[key: string]: Message_Log
	}; 
}