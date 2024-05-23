import { Injectable } from '@angular/core';
import { Store, Selector, Action, State, StateContext } from '@ngxs/store';
import { AppStateModel } from '../app.model';
import { FetchUserDetails, UpdateUserRole } from './app.action';
import { AuthService } from '../user-authentication/auth.service';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    role: '',
    email: '',
    name: '',
  },
})
@Injectable()
export class AppState {
  constructor(private authService: AuthService) {}
  @Selector()
  static userDetails(state: AppStateModel) {
    return { email: state.email, role: state.role };
  }

  @Action(FetchUserDetails)
  fetchUserDetails(ctx: StateContext<any>) {
    const user = this.authService.getCurrentUser();
    ctx.patchState({
      email: user.email,
    });
  }
  @Action(UpdateUserRole)
  updateUserRole(ctx: StateContext<AppStateModel>, { role }) {
    ctx.patchState({
      role,
    });
  }
}
