import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  add(name, desc, price, cat){
    
  }

  dismiss(){
    this.modalController.dismiss()
  }

}
