import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './loginAuth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string='';
  password: string='';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
