import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public loginForm: any;
  public email: any;
  public password: any;
  public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  public error: string = '';

  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public router: Router) {

  }

  public ngOnInit() {
    this.loginForm = this.fb.group({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
        Validators.maxLength(180),
      ]),
    });
    this.email = this.loginForm.get('email');
    this.password = this.loginForm.get('password');
    this.loginForm.valueChanges.subscribe(() => {
      this.error = '';
    });
  }

  public login() {
    this.error = '';
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue())
        .subscribe(res => this.router.navigate(['/home']),
          err => {
            if (err && err.status == 401) {
              this.error = 'Fallo el servicio de autenticación: El usuario o la contraseña son incorecctos.'
            } else {
              this.error = err.error.error || 'Fallo el servicio de autenticación'
            }
          });
    }
  }

  public onInputChange(event: any) {
    event.target.required = true;
  }

}
