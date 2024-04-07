import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeChildModule),
    },

];

export const HomeRouting: ModuleWithProviders <any> = RouterModule.forChild(routes);
