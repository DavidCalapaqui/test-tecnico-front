const baseUrl = 'http://127.0.0.1:8000/api';

export const getFetch = (endpoint, data, method='GET') => {
    const url = `${baseUrl}/${endpoint}`; //localhost:4000/api ...
    if(method === 'GET'){
        return fetch(url);
    }else{
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}