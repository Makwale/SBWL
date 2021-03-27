import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  constructor(public modalController: ModalController, private dbs: DatabaseService) { }

  ngOnInit() {
  }

  add(name, desc, price, cat){
    
    this.dbs.addProduct(name, desc, price, cat);
  }

  dismiss(){
    this.modalController.dismiss()
  }

}
