import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/model/order.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  displayedColumns: string[] = ['id', 'number', 'date', 'status', 'actions'];

  orders: Order[] = [];

  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) {
   }

  ngOnInit() {

   this.getAllOrders();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  search(order: Order): boolean{
    for(let tempOrder of this.orders){
      if(tempOrder.id == order.id) {
        return true;
      }
    }

    return false;
  }

  deleteOrder(id){
    this.dbs.deleOrder(id);
    
    this.deleteOrderFromArray(id);

    this.getAllOrders();
    
  }

  getAllOrders(){
    this.dbs.getOrders().subscribe(data =>{
      data.forEach(orderdata => {
        let tempvar = orderdata.payload.doc.data();

        let order = new Order(orderdata.payload.doc.id, tempvar['number'], tempvar['date'], tempvar["status"]);
        
        if(!this.search(order)){
          this.orders.push(order);
          this.dataSource = new MatTableDataSource(this.orders);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
        }
       
      
    });


   
          this.dataSource = new MatTableDataSource(this.orders);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
   

    });
    

  }

  deleteOrderFromArray(id){
    for(let i = 0; i < this.orders.length ; i++){
      if(this.orders[i].id == id){
        this.orders.splice(i,1);
      }
    }
  }

  searchOrder(input){
    this.dataSource.filter = input;
  }

  changeOrderStatus(id, status){
    this.dbs.changeOrderStatus(id, status);
    this.getAllOrders();
  }

  navigatToItems(id){
    this.router.navigate(["items"], {queryParams: {"id": id}});
  }

}
