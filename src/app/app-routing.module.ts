import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainPage } from './pages/main/main.page';

const routes: Routes = [
  
  {
    path: '',
    component: MainPage,
    children: [  
    
    {
      path: 'home',
      loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'customers',
      loadChildren: () => import('./pages/customers/customers.module').then( m => m.CustomersPageModule)
    },
    
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'products',
      loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
    },
    {
      path: 'orders',
      loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
    },]
  },

  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
