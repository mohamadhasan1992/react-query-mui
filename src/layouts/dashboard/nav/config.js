// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'basics',
    path: '/dashboard/blog?skip=0&limit=10',
    icon: icon('ic_user'),
  },
  {
    title: 'infinit scroll',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blogPage',
    path: '/dashboard/blogPage?skip=0&limit=100',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
