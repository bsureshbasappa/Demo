import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-detials',
  templateUrl: './product-detials.component.html',
  styleUrls: ['./product-detials.component.scss']
})
export class ProductDetialsComponent implements OnInit {

product:IProduct;

  constructor(private shopservice:ShopService, private activateRoute:ActivatedRoute, private bcService:BreadcrumbService) {
    this.bcService.set('@productDetails','');
   }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopservice.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product=>{
      this.product=product;
      this.bcService.set('@productDetails',product.name );
    },error=>{
      console.log(error);
    });
  }

}
