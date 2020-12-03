import { Location } from './location';

//used for our API 
export interface Address {
    _id?: any;
  person_sub: string;
  default_address?: boolean;
  address_string?: string;
  place_id?: string;
  address_name: string;
    location?: {
        [key: string]: Location
    };    
}


//used for google API 
export interface PlaceType {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
      main_text_matched_substrings: [
        {
          offset: number;
          length: number;
        },
      ];
    };
  }