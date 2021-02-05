import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'Flappy Bird';

  public chooseBird;

  public userSignIn: any

  public signIn(user){
    this.userSignIn = user
  }
}

