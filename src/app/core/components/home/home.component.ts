import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;
  isAuthenticated:boolean = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  public ngOnInit() {
    this.authService.userData().subscribe(user => {this.user = user ? user : {
      name: '-',
      email: '-',
    };
    this.isAuthenticated = !!user;
  });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
