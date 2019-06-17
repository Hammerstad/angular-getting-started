import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from '../products/product-detail.guard';
import { ProductDetailComponent } from '../products/product-detail.component';
import { ProductListComponent } from '../products/product-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      }
    ]),
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
