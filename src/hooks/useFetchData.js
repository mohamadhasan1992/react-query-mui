
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { queryConstants } from "src/react-query/queryConstants";
import { axiosInstance } from "src/axiosInstance";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";



async function getData(endpoint, skip, limit){
    const {data} = await axiosInstance.get(`/${endpoint}?skip=${skip}&limit=${limit}`);
    return data;
}


const initialUrl = 'https://dummyjson.com/products?limit=10';
async function getDataInfinit(host){
    const response = await axios.get(host);
    return response.data;
}

export function useInfiniteFetch(url){
    const { data, fetchNextPage, hasNextPage, isError, error } = useInfiniteQuery(
        `infinit-${url}`,
        ({pageParam = initialUrl}) => getDataInfinit(pageParam),
        {
          getNextPageParam: (lastPage) => {
            if((lastPage.skip + lastPage.limit) >= lastPage.total){
              return undefined
            }else{
              return `${initialUrl}&skip=${lastPage.limit + lastPage.skip}`
            }
          }
        }
      );

      return {data, fetchNextPage, hasNextPage}
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