import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/service/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  router: any;
  constructor(
    private authenticationService: AuthenticationService,
    private route: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  public onSubmit() {
    this.authenticationService
      .login(this.loginForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.me();

        this.route.navigate(['/dashboard']);
      });
  }
  me = () => {
    this.authenticationService.me().subscribe({
      next: (res: any) => {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('userdata', JSON.stringify(res.username));
      },
    });
  };
}
