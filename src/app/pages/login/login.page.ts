import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private afa: AngularFireAuth, private router: Router, private ads: AdminService) { }

  ngOnInit() {
    
  }

  signIn(email, password){
    this.afa.signInWithEmailAndPassword(email, password).then( userCredentials => {
      this.ads.isAuthorised = true;
      this.router.navigateByUrl("main");
    }).catch( error => {
      alert(error.message);
    })
  }

}
