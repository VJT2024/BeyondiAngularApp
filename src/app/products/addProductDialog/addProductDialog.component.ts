import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../products.model';
import { SharedModule } from '../../shared/shared.module';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../../user-authentication/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'addProductDialog',
  templateUrl: './addProductDialog.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    SharedModule,
  ],
  styleUrl: './addProductDialog.scss',
})
export class AddProductDialog {
  addProductFormGroup: FormGroup;
  addUserFormGroup: FormGroup;
  exisistingUser: boolean = false;
  constructor(
    private store: AngularFirestore,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddProductDialog>,

    @Inject(MAT_DIALOG_DATA) public data
  ) {}
  ngOnInit() {
    this.addProductFormGroup = this.formBuilder.group({
      name: [this.data?.item?.name],
      prop1: [this.data?.item?.prop1],
      prop2: [this.data?.item?.prop2],
    });
    this.addUserFormGroup = this.formBuilder.group({
      username: [''],
      role: [''],
    });
  }

  submitProductForm() {
    const id = uuid();
    if (this.data.type === 'add') {
      this.store
        .collection('Products')
        .add({
          id: id,
          name: this.addProductFormGroup.value.name,
          prop1: this.addProductFormGroup.value.prop1,
          prop2: this.addProductFormGroup.value.prop2,
        })
        .then((res) => {
          this.snackBar.open('Product added succesfully', 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 500,
          });
          this.onNoClick();
        })
        .catch((error) => console.log(error));
    } else if (this.data.type === 'edit') {
      const dataRef = this.store.firestore
        .collection('Products')
        .where('id', '==', this.data?.item?.id)
        .get();
      dataRef.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .update({
              name: this.addProductFormGroup.value.name,
              prop1: this.addProductFormGroup.value.prop1,
              prop2: this.addProductFormGroup.value.prop2,
            })
            .then(() =>
              this.snackBar.open('Product added succesfully', 'X', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 500,
              })
            );
        });
      });
      this.onNoClick();
    }
  }

  addUser(): void {
    this.authService.addUserFromAdmin(
      this.addUserFormGroup.value.username,
      this.addUserFormGroup.value.role
    );
    this.onNoClick();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
