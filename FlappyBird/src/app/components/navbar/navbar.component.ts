import { Component, OnDestroy, OnInit } from '@angular/core';
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
    }catch(err){
      alert("Sigout failed");
    }
  }
  public user:any;
  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user
      }
    })
  }

}
