import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerHomePage } from './dealer-home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dealer-home/dealer',
    pathMatch: 'full'
  },
  {
    path: 'dealer-home',
    component: DealerHomePage,
    children: [
      {
        path: 'dealer',
        children: [
          {
            path: '',
            loadChildren: () => import('../dealer/dealer.module').then( m => m.DealerPageModule)
          }
        ]
      },
      {
        path: 'scrap-items',
        children: [
          {
            path: '',
            loadChildren: () => import('../../customer/scrap-items/scrap-items.module').then( m => m.ScrapItemsPageModule)
          }
        ]
      },
      {
        path: 'my-booking',
        children: [
          {
            path: '',
            loadChildren: () => import('../../customer/my-booking/my-booking.module').then( m => m.MyBookingPageModule)
          }
        ]
      },
      {
        path: 'my-cart',
        children: [
          {
            path: '',
            loadChildren: () => import('../../customer/my-cart/my-cart.module').then( m => m.MyCartPageModule)
          }
        ]
      },
      {
        path: 'my-account',
        children: [
          {
            path: '',
            loadChildren: () => import('../../customer/my-account/my-account.module').then( m => m.MyAccountPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'customer-home/customer',
        pathMatch: 'full'
      }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerHomePageRoutingModule {}
