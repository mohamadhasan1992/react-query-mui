import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from 'src/components/loading/spinner';
import Error from 'src/components/errror/error';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ data, loadMore, hasMore, isLoading, isError, error }) {
  return (
    <>
    {isLoading && <Spinner />}
    {isError && <Error detail={error} />}
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
      <Grid container spacing={3}>
        {data?.pages.map(eachPageData => {
          return eachPageData.results.map((product, index) => (
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
