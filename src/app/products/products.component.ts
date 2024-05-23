import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialog } from './addProductDialog/addProductDialog.component';
import { AppState } from '../store/app.state';
import { Select } from '@ngxs/store';
import { Product } from './products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Select(AppState.userDetails)
  userDetails$: Observable<{ email: string; role: string }>;

  constructor(private store: AngularFirestore, public dialog: MatDialog) {}

  todo = this.store
    .collection('Products')
    .valueChanges([{ id: 'id' }]) as Observable<any>;

  ngOnInit() {}

  openAddDialog(type, item?: Product) {
    const dialogRef = this.dialog.open(AddProductDialog, {
      data: {
        type: type,
        item: item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  delete(id: string) {
    const dataRef = this.store.firestore
      .collection('Products')
      .where('id', '==', id)
      .get();
    dataRef.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }

  ngOnDestroy() {}
}
