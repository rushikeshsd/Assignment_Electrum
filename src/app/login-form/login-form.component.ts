import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from "@angular/router";
// import { UserListComponent } from '../user-list/user-list.component';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private route: Router, private fb: FormBuilder) { }
  loginForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const userObj = {
        email:this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      }
      localStorage.setItem('userObj', JSON.stringify(userObj));
      this.route.navigate(['/users']);
    } else {
      alert('Please fill all the details'); // TODO : need to use notification
    }
  }
}
