import { Person }from '../models';
import { Constants } from '../auth/Constants';

//create new person
var peep = Constants.baseURL + '/people/';
  export const createPerson = async (newpers: Person, accessToken:string): Promise<any> => {
    const payload: Person = newpers;
    const response = await fetch(`${peep}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload),
         headers: {
           Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json'
      }
    } as RequestInit);
  
    return response;
}
  

//fetch Person

export async function getSinglePerson(person_sub:string, accessToken:string): Promise<Person[]> {
  const response = await fetch(`${peep}${person_sub}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }); 
  return response.json();
}

export async function updatePerson(newPers:Person, user:string, accessToken:string ): Promise<any> {
  const payload: Person = newPers;
  const response = await fetch(`${peep}${user}`, {
    method: 'PATCH',
    mode: 'cors',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
} as RequestInit);
  return response;
}