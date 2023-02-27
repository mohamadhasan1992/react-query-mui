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
const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async(url) => {
  const response = await fetch(url);
  return response.json();
}

export default function ProductsPage() {
  // Api returns an object containing
  //  count: number
  //  next: url
  // previous: null || url
  // results: People[]
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error,isFetching } = useInfiniteQuery(
    'sw-people',
    ({pageParam = initialUrl}) => fetchUrl(pageParam),
    {
      // getNextPageParam: (lastPage) => `initialPage?page={lastPage.page + 1}&limit={lastPage.limit}` // add a condition to reach end of the list
      getNextPageParam: (lastPage) => lastPage.next || undefined
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
          data={data} 
          loadMore={fetchNextPage} 
          hasMore={hasNextPage} 
          isLoading={isFetching}
          isError={isError}
          error={error}
        />
      </Container>
    </>
  );
}
