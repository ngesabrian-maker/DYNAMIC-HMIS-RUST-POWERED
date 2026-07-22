const API = "http://127.0.0.1:8000/api/staff";

const CACHE_KEY = "staff_cache";

export async function getStaff(forceRefresh = false){

    if(!forceRefresh){

        const cached = sessionStorage.getItem(CACHE_KEY);

        if(cached){

            console.log("Loaded staff from cache");

            return JSON.parse(cached);

        }

    }

    console.log("Fetching staff from API...");

    const response = await fetch(API);

    const data = await response.json();

    sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify(data)
    );

    return data;

}

export function clearStaffCache(){

    sessionStorage.removeItem(CACHE_KEY);

}

export function updateStaffCache(data){

    sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify(data)
    );

}