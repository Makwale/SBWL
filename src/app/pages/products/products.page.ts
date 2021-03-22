import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/model/product.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'desc', 'price', 'actions'];

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
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  deleteDuplicates(){
    for(let instructor of this.products){
      if( this.tempVar.length < 1){
        this.tempVar.push(instructor);
      }else{
        if(!this.search(instructor)){
          this.tempVar.push(instructor);
        }
        
      }
    }

    this.products = this.tempVar;
    
    return this.products;
  }

  search(product: Product): boolean{
    for(let tempCus of this.tempVar){
      if(tempCus.id == product.id) {
        return true;
      }
    }

    return false;
  }

  deleteProdcut(id){
    this.dbs.deleteProduct(id);
    
    this.deleteProductFromArray(id);

    this.getAllProducts();
    
  }

  getAllProducts(){
    this.dbs.getProducts().subscribe(data =>{
      data.forEach(productdata => {
        let tempvar = productdata.payload.doc.data();

        let product = new Product(productdata.payload.doc.id, tempvar['name'], tempvar['desc'],
        tempvar['price']);
        

        this.products.push(product);

        console.log(tempvar)
        
        this.deleteDuplicates();
        
    });



    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    

  });

  }

  deleteProductFromArray(id){
    for(let i = 0; i < this.products.length ; i++){
      if(this.products[i].id == id){
        this.products.splice(i,1);
      }
    }
  }

}
