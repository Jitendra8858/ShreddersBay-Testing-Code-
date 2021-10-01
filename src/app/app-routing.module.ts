import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'frontend',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'frontend',
    loadChildren: () => import('./frontend/frontend.module').then( m => m.FrontendPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'my-cart',
    loadChildren: () => import('./customer/my-cart/my-cart.module').then( m => m.MyCartPageModule)
  },
  {
    path: 'my-booking',
    loadChildren: () => import('./customer/my-booking/my-booking.module').then( m => m.MyBookingPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./customer/my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
  {
    path: 'scrap-items',
    loadChildren: () => import('./customer/scrap-items/scrap-items.module').then( m => m.ScrapItemsPageModule)
  },
  {
  path: 'customer',
    component: CustomerPage,
    children: [
      {
        path: 'customer',
        children: [
          {
            path: '',
            loadChildren: './customer/customer/CustomerPage.module#CustomerPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'customer',
        pathMatch: 'full'
      }
      ,
      {
        path: 'my-booking',
        redirectTo: 'my-booking',
        pathMatch: 'full'
      }
      ,
      {
        path: 'my-cart',
        redirectTo: 'my-cart',
        pathMatch: 'full'
      }
      ,
      {
        path: 'my-account',
        redirectTo: 'my-account',
        pathMatch: 'full'
      }
      ,
      {
        path: 'scrap-items',
        redirectTo: 'scrap-items',
        pathMatch: 'full'
      }
  ]
},
  {
    path: 'booking-details',
    loadChildren: () => import('./customer/booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

