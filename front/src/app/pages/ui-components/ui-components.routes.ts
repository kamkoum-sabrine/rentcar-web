import { Routes } from '@angular/router';

// ui
import { AppCarComponent } from './cars/car.component';
import { AppClientsComponent } from './clients/clients.component';
import { AppContratsComponent } from './contracts/contrats.component';


export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cars',
        component: AppCarComponent,
      },
      {
        path: 'clients',
        component: AppClientsComponent,
      },
      {
        path: 'contracts',
        component: AppContratsComponent,
      }
    ],
  },
];
