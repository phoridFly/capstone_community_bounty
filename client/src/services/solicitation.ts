import { Solicitation } from '../models';
import { SolicitsWithAddress } from '../models/solicits-with-address';
import { Constants } from '../auth/Constants';


var url = Constants.baseURL + '/solicitations';




 url = Constants.baseURL + '/solicitations/';
export async function fetchSolicitationsWithAddressCoordinates(centerLong:number, centerLat:number, radius:number, token:string): Promise<SolicitsWithAddress[]> {
    const encodedLong = encodeURIComponent(centerLong);
    const encodedLat = encodeURIComponent(centerLat);
    const encodedRad = encodeURIComponent(radius);
    //console.log("here", encodedRad);


    const response = await fetch(`${url}radius/${encodedLong}/${encodedLat}/${encodedRad}`, 
         {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    if (response.status === 200) {
        return response.json();
    } else {
        const defaultList: SolicitsWithAddress[] =[{
            _id: 'default',
            list_id: 'default',
            product_name: 'empty',
            coordinates: [0, 0]
        }]
        return defaultList; 
    }
        
        }
    
// Route 3
export async function fetchMySolicitations(person_sub:string, accessToken:string): Promise<Solicitation[]> {
    const response = await fetch(`${url}/seller/${person_sub}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
}

// POST fetch to create new solicitation
export const createSolicitation = async (newSolicit: Solicitation, accessToken:string): Promise<any> => {
    const payload: Solicitation = newSolicit;
    const response = await fetch(`${url}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload),
    } as RequestInit);
    return response;
}


//import { Solicitation} from '../models';


 url = Constants.baseURL + '/solicitations/';
export async function fetchSolicitations(): Promise<Solicitation[]> {
    const response = await fetch(`${url}`);
    return response.json();
}


// PATCH route to update a solicitation with id and new solicitation
 url = Constants.baseURL + '/solicitations/';
export const updateSolicitation = async (solicitation_id: string, updatedSolicitation:Solicitation, accessToken: string): Promise<any> => {
    const payload: Solicitation = updatedSolicitation;
    const response = await fetch(`${url}/${solicitation_id}`, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload),
    } as RequestInit);
    return response;
} 
