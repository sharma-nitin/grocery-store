import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  model: any = {};
  constructor(private router:Router) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.model);
    this.router.navigate(['/home']);

  }
}
