import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Acceuil',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Gestion',
  },
  {
    displayName: 'Véhicules',
    iconName: 'car',
    bgcolor: 'accent',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Clients',
    iconName: 'users',
    bgcolor: 'warning',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Contrats',
    iconName: 'clipboard-data',
    bgcolor: 'success',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Factures',
    iconName: 'printer',
    bgcolor: 'error',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    bgcolor: 'primary',
    route: '/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    bgcolor: 'accent',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    bgcolor: 'warning',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    bgcolor: 'success',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    bgcolor: 'error',
    route: '/extra/sample-page',
  },
];
