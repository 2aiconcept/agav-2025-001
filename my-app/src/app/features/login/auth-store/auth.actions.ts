import { createAction, props } from '@ngrx/store';

// action to login captured  by effect to call api
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

// action to loginSuccess captured  by reducer to modify state
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; token: string }>()
);

// action for login failure captured  by reducer to modify state
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// action for logout captured  by reducer to modify state
export const logout = createAction('[Auth] Logout');
