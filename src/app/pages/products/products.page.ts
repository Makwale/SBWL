import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/model/product.model';
import { DatabaseService } from 'src/app/services/database.service';
import { AddproductPage } from '../addproduct/addproduct.page';
import { UpdateproductPage } from '../updateproduct/updateproduct.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  displayedColumns: string[] = ['name', 'desc', 'price', 'actions'];

  products: Product[] = [];

  dataSource: MatTableDataSource<Product>;

  tempVar: Product[] = [];

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) {
   }

  ngOnInit() {

   this.getAllProducts();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async addProduct(){
    let modal = await this.modalController.create({
      component: AddproductPage
    })

    modal.present();
  }

  async updateProduct(id){
    let prod: Product = this.products.filter( product => product.id == id).pop();
    let modal = await this.modalController.create({
      component: UpdateproductPage,
      componentProps: {
        product: prod,
      }
    })

    modal.present();
  }

 

  search(product: Product): boolean{
    for(let tempCus of this.products){
      if(tempCus.id == product.id) {
        return true;
      }
    }

    return false;
  }

  deleteProduct(id){
    if(confirm("Are you sure ?")){
      this.dbs.deleteProduct(id);
    
      this.deleteProductFromArray(id);

      this.getAllProducts();
    }
    
    
  }

  getAllProducts(){
    this.dbs.getProducts().subscribe(data =>{
      data.forEach(productdata => {
        let tempvar = productdata.payload.doc.data();

        let product = new Product(productdata.payload.doc.id, tempvar['name'], tempvar['desc'],
        tempvar['price'], tempvar['category']);
        
        if(!this.search(product)){
          this.products.push(product);
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
     
    });



  
    

  });

  }

  deleteProductFromArray(id){
    for(let i = 0; i < this.products.length ; i++){
      if(this.products[i].id == id){
        this.products.splice(i,1);
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        break;
      }
    }
  }

  searchProduct(value){
    this.dataSource.filter = value;
  }

}
