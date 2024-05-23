import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
  AuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  deleteUser,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { Observable, from } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseApp } from '@angular/fire/compat';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserRole } from '../store/app.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();
  constructor(
    private router: Router,
    private store: AngularFirestore,
    private appStore: Store,
    private snackBar: MatSnackBar
  ) {}
  token: string = '';
  user;

  signinUser(email: string, password: string) {
    const signIn = signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        this.getToken().subscribe(() => {
          this.getUserRole();
        });
      })
      .catch((error) => {
        this.snackBar.open('Error loging in', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 500,
        });
      });
    return from(signIn);
  }

  registerUser(email: string, password: string): Observable<any> {
    const register = createUserWithEmailAndPassword(this.auth, email, password)
      .then((response) => {
        this.addUser(email, 'user');
        this.snackBar.open('Succesfully added the User', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 500,
        });
      })
      .catch((error) =>
        this.snackBar.open('Error', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 500,
        })
      );
    return from(register);
  }

  getToken(): Observable<any> {
    const token = this.auth.currentUser
      ?.getIdToken()
      .then((tokenId) => (this.token = tokenId));
    return from(token);
  }

  getCurrentUser(): User {
    return getAuth().currentUser;
  }

  isAuthenticated(): Boolean {
    return Boolean(this.token);
  }

  getUserRole() {
    const email = this.getCurrentUser().email;
    const userDetails = this.store.firestore
      .collection('Users')
      .where('username', '==', email)
      .get();

    userDetails.then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        let pathStr = doc.ref.path;
        const list = pathStr.split('/');
        const user = this.store
          .collection(list[0])
          .doc(list[1])
          .valueChanges({ username: email }) as Observable<any>;
        user.subscribe((res) => {
          this.user = res;
          if (!this.user.isDeleted) {
            this.router.navigate(['home/products']);
            this.snackBar.open('Logged In.', 'X', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 800,
            });
          } else {
            this.snackBar.open(
              'Your account has been disabled by Admin.',
              'X',
              {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 800,
              }
            );
            this.router.navigate(['']);
          }

          this.appStore.dispatch(new UpdateUserRole(this.user?.role));
        });
      })
    );
  }

  addUser(email: string, role: string) {
    this.store.firestore
      .collection('Users')
      .add({ username: email, role: role, isDeleted: false });
  }
  addUserFromAdmin(email: string, role: string) {
    const password = Math.random().toString(36).slice(-8);
    return this.registerUser(email, password);
  }

  sendPasswordResetRequest(email: string): void {
    sendPasswordResetEmail(this.auth, email);
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.token = null;
      this.router.navigate(['']);
    });
  }
}
