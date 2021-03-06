import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$=this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping=0;

  constructor(private http: HttpClient) { }

  createPaymentIntent(){
    return this.http.post(this.baseUrl +'payments/'+ this.getCurrentBasketValue().id,{})
    .pipe(
      map((basket:IBasket)=>{
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      })
    );
  }

  setShippingPrice(delivaryMethod:IDeliveryMethod){
    this.shipping=delivaryMethod.price;
    const basket=this.getCurrentBasketValue();
    basket.deliveryMethodId=delivaryMethod.id;
    basket.shippingPrice=delivaryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
    console.log("setShippingPrice")
  }

  getBasket(id:String){
    return this.http.get(this.baseUrl+'basket?id=' + id).pipe(
      map((basket:IBasket)=>{
        this.basketSource.next(basket);
        this.shipping=basket.shippingPrice;
        this.calculateTotals();
        console.log("getBasket")
      })
    );
  }

  setBasket(basket:IBasket){
    return this.http.post(this.baseUrl+ 'basket', basket).subscribe((response:IBasket)=>{
      this.basketSource.next(response);
      this.calculateTotals();
      console.log("setBasket")
    }, error=>{
      console.log(error);
    });
  }

  getCurrentBasketValue(){
    console.log(" getCurrentBasketValue")
    return this.basketSource.value;
  }

  addItemToBasket(item:IProduct, quantity=1) {
    const itemToAd:IBasketItem=this.mapProductItemToBasketItem(item, quantity)
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items=this.addOrUpdateItem(basket.items, itemToAd, quantity);
    this.setBasket(basket);
    console.log("addItemToBasket")
  }

  incrementItemQuantity(item:IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x=>x.id===item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
    console.log("incrementItemQuantity")
  }

  decrementItemQuantity(item:IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x=>x.id===item.id);

    if(basket.items[foundItemIndex].quantity>1){
     basket.items[foundItemIndex].quantity--;
    } else {
      this.removeItemFromBasket(item);
    }
    console.log("decrementItemQuantity")
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x=>x.id === item.id)){
      basket.items=basket.items.filter(i=>i.id !== item.id);
      if(basket.items.length>0) {
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }

      console.log("removeItemFromBasket")

    }
  }

  deleteLocalBasket(id:string){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
    console.log("deleteLocalBasket")
  }

  deleteBasket(basket: IBasket) {
    console.log("deleteBasket")
    return this.http.delete(this.baseUrl+ 'basket?id=' +basket.id).subscribe(() =>{
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    },error =>{
      console.log(error);
    })
  }
 
  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a,b)=>(b.price*b.quantity)+a,0);
    const total = subtotal+shipping;
    this.basketTotalSource.next({shipping,total,subtotal});
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAd: IBasketItem, quantity: number): IBasketItem[] {
    console.log(items);
    const index = items.findIndex(i=>i.id===itemToAd.id);
    if(index===-1){
      itemToAd.quantity=quantity;
      items.push(itemToAd);
    } else {
      items[index].quantity+=quantity;
    }
    return items;
  }
  private createBasket():IBasket{
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName:item.name,
      price:item.price,
      pictureUrl:item.pictureUrl,
      quantity,
      brand:item.productBrand,
      type:item.productType  
    }
  }

}