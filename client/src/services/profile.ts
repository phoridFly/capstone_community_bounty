import { Item, Profile,  Watchlist } from '../models';
import { Constants } from '../auth/Constants';

//fetchprofile based on person with token 
var url = Constants.baseURL + '/profile';
export async function fetchProfile(person_sub:string, accessToken:string): Promise<Profile[]> {
  const response = await fetch(`${url}/person/${person_sub}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }); 
    return response.json();
}

//fetch watchlist for person with token
export async function fetchMyWatchlist(person_sub: string,accessToken:string): Promise<Watchlist[]> {
  const response = await fetch(`${url}/watchlist/${person_sub}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }); 
    return response.json();
}


//fetch all items in database (for dropdown) with token
export async function fetchItems(accessToken:string): Promise<Item[]> {
  const response = await fetch(`${Constants.baseURL}/items`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }); 
  
    return response.json();
}

//delete watchlist item on person  ##NEEDS TOKEN
url = Constants.baseURL + '/profile';
export const deleteWatchlistItem = async (item_id: string, person_sub: string, accessToken:string): Promise<any> => {
  const response = await fetch(`${url}/watchlist/${person_sub}/${item_id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response;
}

  //add watchlist item  ##NEEDS TOKEN
  export const addWatchlistItem = async (product_name:string,person_sub:string, accessToken:string): Promise<any> => {
    const response = await fetch(`${url}/watchlist/${person_sub}/${product_name}`, {
        method: 'PUT',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    } as RequestInit);

    return response;
}

var check = Constants.baseURL + '/profile';
//check and see if person exists 
export async function getProfile(user:string, accessToken:string ): Promise<any> {
  const response = await fetch(`${check}/${user}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }); 
  
    return response;
}



//create new profile
url = Constants.baseURL + '/profile/'
  export const createProfile = async (newprof: Profile, accessToken:string): Promise<any> => {
    const payload: Profile = newprof;
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

//edit profile route ###NEEDS TESTING
url = Constants.baseURL + '/profile';
export const updateProfile= async (updateProfile: Profile, sub:string, accessToken:string): Promise<any> => {
  const payload: Profile = {
      ...updateProfile
  };
  const response = await fetch(`${url}/${sub}`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',  
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(payload),
    headers: {
     'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  } as RequestInit);

  return response;
}

