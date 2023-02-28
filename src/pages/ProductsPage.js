import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductList } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { useInfiniteQuery } from 'react-query';
import { useInfiniteFetch } from 'src/hooks/useFetchData';

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
  const {data,fetchNextPage, hasNextPage} = useInfiniteFetch('products')
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
        />
      </Container>
    </>
  );
}
