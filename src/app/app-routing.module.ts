import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { MainPage } from './pages/main/main.page';

const routes: Routes = [
  
  {
    path: 'main',
    component: MainPage,
    canActivate: [ AdminGuard ],
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
    },
    {
      path: 'items',
      loadChildren: () => import('./pages/items/items.module').then( m => m.ItemsPageModule)
    },]
  },
  {
    path: 'addproduct',
    loadChildren: () => import('./pages/addproduct/addproduct.module').then( m => m.AddproductPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'updateproduct',
    loadChildren: () => import('./pages/updateproduct/updateproduct.module').then( m => m.UpdateproductPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
