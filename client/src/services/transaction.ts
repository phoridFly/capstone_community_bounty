import { Transaction, SolicitsPlusTransactions } from '../models';
import { Constants } from '../auth/Constants';

var url = Constants.baseURL + '/transactions';

// Fetch all Transactions
export async function fetchTotalTransaction(accessToken:string): Promise<Transaction[]> {
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
}

// Fetch all BUYER SolicitsPlusTransactions
export async function fetchBuyerSPTransaction(buyer_sub:string, accessToken:string): Promise<SolicitsPlusTransactions[]> {
    const response = await fetch(`${url}/buyer/${buyer_sub}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
}

// Fetch all SELLER SolicitsPlusTransactions
export async function fetchSellerSPTransaction(seller_sub:string, accessToken:string): Promise<SolicitsPlusTransactions[]> {
    const response = await fetch(`${url}/seller/${seller_sub}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.json();
}


//export const createAddress = async (newAddy: Address, accessToken:string): Promise<any> => {
    export const createTransaction = async (newAction: Transaction, accessToken: string): Promise<any> => {
        const payload: Transaction = newAction;
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
      

export const updateTransactionMsg = async (updatedAction: Transaction, accessToken: string): Promise<any> => {
    const payload: Transaction = updatedAction;
    const response = await fetch(`${url}/${updatedAction._id}/messages`, {
        method: 'PUT',
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
  

export const updateTransaction = async (updatedAction: Transaction, accessToken: string): Promise<any> => {
    const payload: Transaction = updatedAction;
    const response = await fetch(`${url}/${updatedAction._id}`, {
        method: 'PATCH',
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

