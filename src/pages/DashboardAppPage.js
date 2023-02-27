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
              title="Key Features"
              list={[...Array(9)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Fetching data',
                  'loading/ errors state',
                  'Pagination',
                  'Prefetching',
                  'Mutation',
                  'Infinite Scroll',
                  'Setup, Centralization, Custom Hooks',
                  'Integrating Auth',
                  'Dependent queries',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Course overview"
              list={[
                { id: '1', label: 'implementing React query' },
                { id: '2', label: 'fetchs are all CSR' },
                { id: '3', label: 'data source htps://jsonplaceholder.typicode.com' },
                { id: '4', label: 'UI is a mui free template' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
