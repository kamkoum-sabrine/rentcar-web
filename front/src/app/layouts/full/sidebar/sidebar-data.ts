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
    route: '/ui-components/cars',
  },
  {
    displayName: 'Clients',
    iconName: 'users',
    bgcolor: 'warning',
    route: '/ui-components/clients',
  },
  {
    displayName: 'Contrats',
    iconName: 'clipboard-data',
    bgcolor: 'success',
    route: '/ui-components/contracts',
  }
];
