import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/service/authentication';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  [x: string]: any;

  constructor(
    private route: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  public onSubmit() {
    this.authenticationService.logout(this.logoutForm).subscribe((res: any) => {
      console.log(res);
      this.route.navigate(['/login']);
    });
  }
  logoutForm(_logoutForm: any) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
