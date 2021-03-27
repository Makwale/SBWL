import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/model/product.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.page.html',
  styleUrls: ['./updateproduct.page.scss'],
})
export class UpdateproductPage implements OnInit {

  @Input() product: Product;
  url = "";

  constructor(private dbs: DatabaseService, private modalController: ModalController) { }

  ngOnInit() {
   
  }

  updateProduct(name, desc, price, cat){
    
    this.product.name = name;

    this.product.desc = desc;

    this.product.price = price;

    this.product.cat = cat == undefined ? "": cat;

    this.product.url = this.url;

    this.dbs.updateProduct(this.product);

  }

  dismiss(){
    this.modalController.dismiss()
  }

}
