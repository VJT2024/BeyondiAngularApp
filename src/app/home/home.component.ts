import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchUserDetails } from '../store/app.action';
import { AppState } from '../store/app.state';
import { AuthService } from '../user-authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @Select(AppState.userDetails)
  userDetails$: Observable<{ email: string; role: string }>;

  constructor(private store: Store, private authService: AuthService) {}
  ngOnInit() {
    this.store.dispatch([FetchUserDetails]);
  }
  signOutUser() {
    this.authService.signOut();
  }
}
