import { Loc_Ambiguity } from './enums';
import { Radius_Distance } from './enums';
import { Contact_Method } from './enums';

export interface Profile {
    _id?: any;
    address_id?: string;
    person_sub: string;
    contact_method?: Contact_Method;
    search_radius?: Radius_Distance;
    loc_ambiguity?: Loc_Ambiguity;
    watchlist?: string[];
    session_location?: boolean;
 
}