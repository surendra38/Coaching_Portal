import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private _api: ApiService, private router: Router) {
    if (localStorage.getItem('auth')) {
      this.router.navigate(['/signup']);
    }
  }

  ngOnInit() {
    this.formInIt();
  }

  formInIt() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(loginForm: any) {
    if (loginForm.invalid) {
      return;
    } else {
      this._api.postData('login', loginForm.value).subscribe((res: any) => {
        if (res) {
          localStorage.setItem('auth', res.auth);
          alert('Succesfully Login.');
          this.loginForm.reset();
          this.router.navigate(['/signup']);
        }
      });
    }
  }
}
