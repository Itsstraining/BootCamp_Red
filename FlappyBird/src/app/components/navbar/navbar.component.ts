<<<<<<< HEAD
import { asLiteral } from '@angular/compiler/src/render3/view/util';
=======
>>>>>>> 3e09b05ab36a49652061589d515713f7495e2e18
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit,OnDestroy {

  constructor(private auth:AngularFireAuth,  private router:Router){}

  public user:firebase.default.UserInfo;
  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user
      }
    })
  }

  ngOnDestroy(): void {
    this.user=null;
  }
 async logIn(){
      const provider = new firebase.default.auth.GoogleAuthProvider();
      try{
        await this.auth.signInWithPopup(provider);
        this.router.navigate(['main']);
      }catch(err){
        alert("failed");
      }

    }
  async logOut(){
    try{
      await this.auth.signOut();
      this.user=null;
      this.router.navigate(['']);
    }catch(err){
      alert("Sigout failed");
    }
  }
  // public tranfer(){
  //   this.user.displayName = x;

  // }

 

}
