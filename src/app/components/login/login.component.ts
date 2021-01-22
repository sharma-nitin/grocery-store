import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.model);
    this.router.navigate(['/home']);
  }
}
