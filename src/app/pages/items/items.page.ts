import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/model/item.model';
import { Product } from 'src/app/model/product.model';
import { DatabaseService } from 'src/app/services/database.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'desc', 'price', 'quantity', 'total_price'];

  items: Item[] = [];

  
  dataSource: MatTableDataSource<Item>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dbs: DatabaseService, private activatedRoute: ActivatedRoute,
    public ps: ProductsService) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(data =>{
      this.getItems(data["id"])
    })
    
  }

  getItems(id){
    this.dbs.getItems(id).subscribe(data =>{
     
      data.forEach(itemdata => {
        let tempvar = itemdata.payload.doc.data();
        
          let product = this.ps.products.filter( product => product.id == tempvar["product_id"]).pop();

          console.log( tempvar)
          
          console.log(this.ps.products.filter( product => product.id == tempvar["product_id"]))
          let item = new Item(itemdata.payload.doc.id, product,
          tempvar["quantity"], tempvar["total_price"]);
         
          if(!this.search(item)){
            this.items.push(item);
            console.log(item)
            this.dataSource = new MatTableDataSource(this.items);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            
          }
     

       
      
    });

          this.dataSource = new MatTableDataSource(this.items);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
   

    });
    

  }

  search(item: Item): boolean{
    for(let tempCus of this.items){
      if(tempCus.id == item.id) {
        return true;
      }
    }

    return false;
  }

}
