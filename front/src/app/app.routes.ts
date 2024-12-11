import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { LandingComponent } from './pages/landing/landing.component'; // Import du nouveau composant

export const routes: Routes = [
  {
    path: '',
    component: BlankComponent, // Landing page avec mise en page vide
    children: [
      {
        path: '',
        component: LandingComponent, // Landing page devient la route par défaut
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '', // Redirection vers la landing page par défaut
  },
];
