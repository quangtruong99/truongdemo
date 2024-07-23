import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'atm',
    pathMatch: 'full',
  },
  {
    path: 'atm',
    loadChildren: () => import('./atm.module').then(m => m.AtmModule),
  },
];

export const AtmRouting: ModuleWithProviders<any> =
  RouterModule.forChild(routes);
