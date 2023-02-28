import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import InfiniteScroll from 'react-infinite-scroller';
import Error from 'src/components/errror/error';

// ----------------------------------------------------------------------



export default function ProductList({ products, loadMore, hasMore }) {
  return (
    <>
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
      <Grid container spacing={3}>
        {products?.pages.map(eachPageData => {
          return eachPageData?.products.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <ShopProductCard product={product} productId={index + 1} />
            </Grid>
          ))
        })}
      </Grid>
    </InfiniteScroll>
    </>
  );
}
