import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  value = 'World';
  isIframe = false;
  loggedIn = false;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

}
