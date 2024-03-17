import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import {
  PaymentIntent,
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent {
  // @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;
  // public cardOptions: StripeCardElementOptions = {
  //   style: {
  //     base: {
  //       fontWeight: 400,
  //       fontFamily: 'Circular',
  //       fontSize: '14px',
  //       iconColor: '#666EE8',
  //       color: '#002333',
  //       '::placeholder': {
  //         color: '#919191',
  //       },
  //     },
  //   },
  // };
  // public elementsOptions: StripeElementsOptions = {
  //   locale: 'en',
  // };

  // paymentForm!: FormGroup;

  // constructor(
  //   private http: HttpClient,
  //   private fb: FormBuilder,
  //   private stripeService: StripeService
  // ) {
  //   this.paymentForm = this.fb.group({
  //     name: ['John', [Validators.required]],
  //     email: ['john@gmail.com', [Validators.required]],
  //     amount: [100, [Validators.required, Validators.pattern(/d+/)]],
  //   });
  // }

  // ngOnInit(): void {}

  // pay(): void {
  //   if (this.paymentForm.valid) {
  //     this.createPaymentIntent(this.paymentForm.get('amount')?.value)
  //       .pipe(
  //         switchMap((pi: any) =>
  //           this.stripeService.confirmCardPayment(pi.client_secret, {
  //             payment_method: {
  //               card: this.card.element,
  //               billing_details: {
  //                 name: this.paymentForm.get('name')?.value,
  //               },
  //             },
  //           })
  //         )
  //       )
  //       .subscribe((result: any) => {
  //         if (result.error) {
  //           // Show error to your customer (e.g., insufficient funds)
  //           console.log(result.error.message);
  //         } else {
  //           // The payment has been processed!
  //           if (result.paymentIntent.status === 'succeeded') {
  //             // Show a success message to your customer
  //           }
  //         }
  //       });
  //   } else {
  //     console.log(this.paymentForm);
  //   }
  // }

  // createPaymentIntent(amount: number): Observable<PaymentIntent> {
  //   return this.http.post<PaymentIntent>(
  //     `https://localhost:7228/api/create-payment-intent`,
  //     { amount }
  //   );
  // }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51OucOgBoaqreuNETZii1F9MkDkR5wckNFigkYdmIvVflw23JL3qgVvbLGzPXCHVmGqO26pKNzKwpIl2Y1uLGChyn00pUbVWe2g',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
}
