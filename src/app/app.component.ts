import { Component, ViewChild, inject, signal } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {


  title = 'lab-appointment-client';
  role = signal('');
  private authService = inject(AuthService);
  constructor() {
    this.role.set(this.authService.getRolesFromToken());
  }

  handleLoginSuccess(): void {
    console.log('Login successful in the child component');
  }

  paymentHandler: any = null;

  ngOnInit() {
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
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
