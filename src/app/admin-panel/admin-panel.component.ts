import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserData } from './userData.model';
import { FormBuilder } from '@angular/forms';
import { AddProductDialog } from '../products/addProductDialog/addProductDialog.component';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../user-authentication/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {
  userData = this.fireStore
    .collection('Users')
    .valueChanges([{ username: 'username' }]) as Observable<any>;
  tableData: [UserData] = [
    {
      role: '',
      username: '',
    },
  ];
  dataSource = this.tableData;
  displayedColumns: string[] = ['username', 'role', 'changerole', 'delete'];
  constructor(
    private store: Store,
    private fireStore: AngularFirestore,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.userData.subscribe(
      (res) => (this.dataSource = res?.filter((item) => !item.isDeleted))
    );
  }

  changeRole(username: string, role: string) {
    const dataRef = this.fireStore.firestore
      .collection('Users')
      .where('username', '==', username)
      .get();
    dataRef.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({ role: role });
        if (role === 'admin')
          this.authService.sendPasswordResetRequest(username);
      });
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddProductDialog, {
      data: {
        type: 'user',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  deleteUser(username) {
    const dataRef = this.fireStore.firestore
      .collection('Users')
      .where('username', '==', username)
      .get();
    dataRef
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ isDeleted: true });
          this.authService.sendPasswordResetRequest(username);
        });
      })
      .catch((error) =>
        this.snackBar.open('Error deleting the User', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 100,
        })
      );
  }
}
