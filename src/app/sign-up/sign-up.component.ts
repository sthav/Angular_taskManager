import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './signUpAuth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  name: string='';
  username: string='';
  password: string='';

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    this.authService.signUp(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registeration failed:', error);
      }
    );
  }

}
