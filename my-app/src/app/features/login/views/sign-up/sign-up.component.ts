import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth-store/auth.actions';


@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);
  form!: FormGroup;

  // utiliser la méthode signup() de AuthService
  signUp() {
    const user = this.form.value;
    // console.log(user);
    this.store.dispatch(AuthActions.signUp(user));
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }
}
