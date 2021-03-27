import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private router: Router, private dbs: DatabaseService, private afa: AngularFireAuth) { }

  ngOnInit() {
    this.dbs.getProductsForProductService();
  }

  navigate(page){
    this.router.navigateByUrl("main/"+page)
  }

  signout(){
    this.afa.signOut().then(() => {
      this.router.navigateByUrl("login")
    });
  }
}
