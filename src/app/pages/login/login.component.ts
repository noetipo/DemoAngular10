import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoginService} from '../../providers/auth/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, public router: Router) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    if (localStorage.getItem('accessToken')) {
      this.redirectInto();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
  public login(): void {
    this.loginService.login(this.loginForm.value).subscribe(response => {
      if (response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        if (localStorage.getItem('accessToken')) {
          this.redirectInto();
        }
      }
    }, error => {
    });
  }

  redirectInto() {
    this.router.navigate(['dashboard']);
  }

}
