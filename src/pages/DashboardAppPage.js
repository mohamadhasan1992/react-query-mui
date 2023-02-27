import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome to React Query tutorial
        </Typography>

        <Grid container spacing={3}>
          


          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Course overview"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Fetching data',
                  'loading/ errors state',
                  'Pagination',
                  'Prefetching',
                  'Mutation',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Details"
              list={[
                { id: '1', label: 'React query using REST API' },
                { id: '2', label: 'fetchs are all client side' },
                { id: '3', label: 'htps://jsonplaceholder.typicode.com' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
