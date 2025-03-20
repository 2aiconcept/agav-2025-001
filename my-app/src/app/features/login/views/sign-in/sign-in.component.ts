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
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  public form!: FormGroup;
  private fb = inject(FormBuilder);
  private store = inject(Store);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public signIn(): void {
    // console.log(this.form.value);
    const credentials = this.form.value;
    this.store.dispatch(AuthActions.login(credentials));
  }
}
