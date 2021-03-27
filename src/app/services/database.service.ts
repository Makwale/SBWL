import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Product } from '../model/product.model';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  
  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth, 
    private router: Router, public ps: ProductsService) { }

  getCustomers() {
    return this.afs.collection("Customer").snapshotChanges();
  }

  getOrders() {
    return this.afs.collection("Order").snapshotChanges();
  }

  getProducts(){
    
   return this.afs.collection("Product").snapshotChanges()
  }

  getProductsForProductService(){
    
    this.afs.collection("Product").snapshotChanges().subscribe(data =>{
         data.forEach(productdata => {
           let tempvar = productdata.payload.doc.data();
   
           let product = new Product(productdata.payload.doc.id, tempvar['name'], tempvar['desc'],
           tempvar['price']);
           
             if(!this.ps.search(product)){
               this.ps.products.push(product)
             }
          
           })
        
       });
   
     
   }
   
  deleteCustomer(id) {
    if(confirm("Are you sure ?")){
      this.afs.collection("Customer").doc(id).delete().then(() => {
        alert("Customer deleted");
      })
    }
   
  }

  deleteProduct(id) {
    if(confirm("Are you sure ?")){
      this.afs.collection("Product").doc(id).delete().then(() => {
        alert("Product deleted");
      })
    }
  }

  changeOrderStatus(id, status) {
    this.afs.collection("Order").doc(id).update({
      status: status,
    })
  }
  deleOrder(id) {
    if(confirm("Are you sure ?")){
      this.afs.collection("Order").doc(id).delete().then(() =>{
        alert("Order deleted");
      });
    }
  }

  getItems(id){
    return this.afs.collection("Item", ref => ref.where("order_id", "==", id)).snapshotChanges();
  }

  getProduct(id){
    return this.afs.collection("Product").doc(id).snapshotChanges();
  }

  updateProduct(product: Product) {
    
    this.afs.collection("Product").doc(product.id).update({
      name: product.name,
      desc: product.desc,
      price: product.price,
      category: product.cat,
      url: product.url
    }).then(() =>{
      alert("Updated");
    }).catch(error => {
      alert(error.message)
    })
    
  }
}
