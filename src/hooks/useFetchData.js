
import { useQuery, useQueryClient } from "react-query";
import { queryConstants } from "src/react-query/queryConstants";
import { axiosInstance } from "src/axiosInstance";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";



async function getData(endpoint, skip, limit){
    const {data} = await axiosInstance.get(`/${endpoint}?skip=${skip}&limit=${limit}`);
    return data;
}


export function useFetchData(url){
    let [searchParams] = useSearchParams();
    const skip = searchParams.get('skip'); 
    const limit = searchParams.get('limit')
    const queryClient = useQueryClient();

    useEffect(() => {
        const {data} = queryClient.prefetchQuery(
            [queryConstants[url], parseInt(skip) + parseInt(limit), limit],
            () => getData(url,  parseInt(skip) + parseInt(limit), limit)
        )
    },[skip, limit, queryClient])
    
    const {data = {}} = useQuery(
        [queryConstants[url], skip, limit],
        () => getData(url, parseInt(skip), parseInt(limit)),
        {
            staleTime: 2000,
            // onError: (error) => {
            //     setError(error)
            // }
        }
    );
    return data;
}