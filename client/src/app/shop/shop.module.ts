import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetialsComponent } from './product-detials/product-detials.component';
import { ShopRoutingModule } from './shop-routing.module';




@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProductDetialsComponent ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
