import { Address } from '../models';
import { Constants } from '../auth/Constants';



var url = Constants.baseURL + '/address';
//fetch all addresses of person with token 
export async function fetchTotalAddress(person_sub:string,accessToken:string): Promise<Address[]> {
  const response = await fetch(`${url}/person/${person_sub}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
    return response.json();
}

//fetch single address by id with token 
export async function fetchOneAddress(address_id:string,accessToken:string): Promise<Address[]> {
  const response = await fetch(`${url}/${address_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

    return response.json();
}

//delete address 
export const deleteAddress = async (address_id: string, accessToken: string): Promise<any> => {
  const response = await fetch(`${url}/${address_id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${accessToken}`
   }
  
  });
  
  return response;
}

//update address ####NOT TESTED
export const updateAddress = async (address_name: string, sub:string, accessToken:string): Promise<any> => {

  const response = await fetch(`${url}/default/${sub}/${address_name}`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    referrerPolicy: 'no-referrer',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response;
}


//export const createAddress = async (newAddy: Address, accessToken:string): Promise<any> => {
export const createAddress = async (newAddy: Address, accessToken: string): Promise<any> => {
  const payload: Address = newAddy;
  const response = await fetch(`${url}`, {
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