import { Component, ViewChild, inject, signal, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Editor } from 'ngx-editor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'lab-appointment-client';
  role = signal('');
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  handleLoginSuccess(): void {
    console.log('Login successful in the child component');
  }

  paymentHandler: any = null;

  ngOnInit() {
    this.role.set(this.authService.getRolesFromToken());

    if (this.role() === 'Patient') {
      this.router.navigate(['patient/home']);
    } else if (this.role()) {
      this.router.navigate(['staff/appointments']);
    } else {
      this.router.navigate(['login']);
    }

    this.invokeStripe();
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51OucOgBoaqreuNETZii1F9MkDkR5wckNFigkYdmIvVflw23JL3qgVvbLGzPXCHVmGqO26pKNzKwpIl2Y1uLGChyn00pUbVWe2g',
          locale: 'auto',
          token: function (stripeToken: any) {
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
