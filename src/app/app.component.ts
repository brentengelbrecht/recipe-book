import { Component, OnInit, isDevMode } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-book';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (isDevMode()) {
      console.log('Running in DEVELOPMENT mode');
    } else {
      console.log('Running in PRODUCTION mode');
    }

    console.log('environment = ' + JSON.stringify(environment));

    this.authService.autoLogin();
  }
}
