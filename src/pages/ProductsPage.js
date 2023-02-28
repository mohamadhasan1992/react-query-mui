import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductList } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { useInfiniteQuery } from 'react-query';

// ----------------------------------------------------------------------
const initialUrl = 'https://dummyjson.com/products?limit=10';
const fetchUrl = async(url) => {
  const response = await fetch(url);
  return response.json();
}

export default function ProductsPage() {
  // Api returns an object containing
  //  count: number
  //  next: url
  // previous: null || url
  // products: Product[]
  // "total": 100,
  // "skip": 0,
  // "limit": 30
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error,isFetching } = useInfiniteQuery(
    'sw-products',
    ({pageParam = initialUrl}) => fetchUrl(pageParam),
    {
      // getNextPageParam: (lastPage) => `initialPage?page={lastPage.page + 1}&limit={lastPage.limit}` // add a condition to reach end of the list
      // getNextPageParam: (lastPage) => lastPage.next || undefined
      getNextPageParam: (lastPage) => {
        if((lastPage.skip + lastPage.limit) >= lastPage.total){
          return undefined
        }else{
          return `${initialUrl}&skip=${lastPage.limit + lastPage.skip}`
        }
      }
    }
  );
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <ProductList 
          products={data} 
          loadMore={fetchNextPage} 
          hasMore={hasNextPage} 
          isError={isError}
          error={error}
        />
      </Container>
    </>
  );
}
