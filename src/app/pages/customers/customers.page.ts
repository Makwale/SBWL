import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Customer } from 'src/app/model/customer.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'gender', 'phone', 'email', 'actions'];

  customers: Customer[] = [];

  dataSource: MatTableDataSource<Customer>;

  tempVar: Customer[] = [];

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) {
   }

  ngOnInit() {

   this.getAllCustomers();
    
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  deleteDuplicates(){
    for(let instructor of this.customers){
      if( this.tempVar.length < 1){
        this.tempVar.push(instructor);
      }else{
        if(!this.search(instructor)){
          this.tempVar.push(instructor);
        }
        
      }
    }

    this.customers = this.tempVar;
    
    return this.customers;
  }

  search(customer: Customer): boolean{
    for(let tempCus of this.customers){
      if(tempCus.getId() == customer.getId()) {
        return true;
      }
    }

    return false;
  }

  deleteCustomer(studentId){
    this.dbs.deleteCustomer(studentId);
    
    this.deleteStudentFromArray(studentId);

    this.getAllCustomers();
    
  }

  getAllCustomers(){
    this.dbs.getCustomers().subscribe(data =>{
      data.forEach(customerdata => {
        let tempvar = customerdata.payload.doc.data();

        let customer = new Customer(customerdata.payload.doc.id, tempvar['firstname'], tempvar['lastname'],
        tempvar['gender'], tempvar['phone'], tempvar['email']);
        
        if(!this.search(customer)){

          this.customers.push(customer);
          
          this.dataSource = new MatTableDataSource(this.customers);

          this.dataSource.sort = this.sort;

          this.dataSource.paginator = this.paginator;

        }
        
    });

  });

  }

  deleteStudentFromArray(studentId){
    for(let i = 0; i < this.customers.length ; i++){
      if(this.customers[i].getId() == studentId){
        this.customers.splice(i,1);
      }
    }
  }
}
