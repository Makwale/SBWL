import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  deleOrder(id: any) {
    throw new Error('Method not implemented.');
  }
  deleteProduct(studentId: any) {
    throw new Error('Method not implemented.');
  }
  

  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth, 
    private router: Router) { }

  getCustomers() {
    return this.afs.collection("Customer").snapshotChanges();
  }

  getOrders() {
    return this.afs.collection("Order").snapshotChanges();
  }

  getProducts(){
    
      return this.afs.collection("Product").snapshotChanges();
    
  }
  deleteStudent(studentId: any) {
    throw new Error('Method not implemented.');
  }
}
