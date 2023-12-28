import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { StudentDataValidaion } from './studentDataValidation';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  studentRegister!: FormGroup;
  hide = true;
  CourseCategory: any;
  today = new Date();

  constructor(
    private _api: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formInIt();
    this.getCoursesList();
  }

  formInIt() {
    this.studentRegister = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      programCategory: new FormControl('', [Validators.required]),
    });
  }

  getCoursesList() {
    this._api.getData('getCoursesList').subscribe((res: any) => {
      this.CourseCategory = res;
    });
  }

  onFormSubmit(studentRegister: any) {
    if (studentRegister.invalid) {
      this.toastr.error('Please enter correct details');
      return;
    } else {
      studentRegister.value['dateOfBirth'] = moment(
        studentRegister.value['dateOfBirth']
      ).format('DD/MM/YYYY');
      let student: Partial<StudentDataValidaion> = studentRegister.value;
      this._api.postData('registerStudent', student).subscribe((res: any) => {
        if (res) {
          this.toastr.error('Login successfully');
          localStorage.setItem('auth', res.auth);
          this.studentRegister.reset();
          this.router.navigate(['/login']);
        }
      });
    }
  }

  resetForm() {
    this.studentRegister.reset();
  }

  get username() {
    return this.studentRegister.get('username');
  }
  get password() {
    return this.studentRegister.get('password');
  }
  get mobileNumber() {
    return this.studentRegister.get('mobileNumber');
  }
  get email() {
    return this.studentRegister.get('email');
  }

  // number validation
  validateNumber(e) {
    const pattern = /^-?(0|[1-9]\d*)?$/;
    return pattern.test(e.key);
  }

  lettersValidate(e) {
    return (
      (e.charCode > 64 && e.charCode < 91) ||
      (e.charCode > 96 && e.charCode < 123) ||
      e.charCode == 32
    );
  }
}
