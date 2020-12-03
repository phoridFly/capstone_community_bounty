export interface Person {
    _id?: string; 
    person_sub?: string;
    name?: string;
    nickname?: string;
    picture?: string;
    seller_rating?: number;
    buyer_rating?: number;
    solicitations?: string[];
    address_id?: string[];
    contact_id?: string;
    profile_id?: string;
    transactions_id?: string[];
}