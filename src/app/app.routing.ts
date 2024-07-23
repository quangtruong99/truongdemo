import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from 'src/app/page-error/page-error.component';
import { HomeLayoutComponent } from 'src/app/shared/layouts/home-layout/home-layout.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    loadChildren: () => import('./atm/atm.module').then(m => m.AtmModule),
    canActivate: [],
  },
  {
    path: '**',
    component: PageErrorComponent,
  },
];
export const Routing: ModuleWithProviders<any> = RouterModule.forRoot(
  APP_ROUTES,
  {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    enableTracing: false,
    scrollPositionRestoration: 'enabled',
  }
);
