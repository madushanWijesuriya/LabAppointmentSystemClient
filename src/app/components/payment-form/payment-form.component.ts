import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import {
  PaymentIntent,
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../services/invoice.service';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent implements OnInit {
  amount = signal(0);
  invoice = signal({});
  invoiceService = inject(InvoiceService);
  private notificationService = inject(NotificationService);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentFormComponent>
  ) {
    this.invoiceService.getByAppointmentId(data.id).subscribe((res) => {
      this.invoice.set(res);
      this.amount.set(res.amount);
    });
  }
  ngOnInit(): void {}
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51OucOgBoaqreuNETZii1F9MkDkR5wckNFigkYdmIvVflw23JL3qgVvbLGzPXCHVmGqO26pKNzKwpIl2Y1uLGChyn00pUbVWe2g',
      locale: 'auto',
      token: (stripeToken: any) => {
        this.invoiceService.update(this.invoice()).subscribe((res: any) => {
          this.dialogRef.close(true);
          this.notificationService.showSuccess('Payment saved successfully');
        });
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
}
