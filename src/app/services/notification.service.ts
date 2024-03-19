import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.showSnackBar(message, 'success-snackbar');
  }

  showError(message: string): void {
    this.showSnackBar(message, 'full-red-snackbar');
  }

  showWarning(message: string): void {
    this.showSnackBar(message, 'warning-snackbar');
  }

  private showSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 100000,
      panelClass: panelClass,
    });
  }
}
