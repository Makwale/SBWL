import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [];

  constructor() { }

  
  search(product: Product): boolean{
    for(let tempCus of this.products){
      if(tempCus.id == product.id) {
        return true;
      }
    }

    return false;
  }
}
