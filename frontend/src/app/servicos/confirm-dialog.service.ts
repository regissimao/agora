import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../component/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) {}

  confirm(title: string, message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title, message },
    });

    return dialogRef.afterClosed().toPromise();
  }
}
