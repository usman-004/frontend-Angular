import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaypalApiService } from 'src/app/service/paypal.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {
  links: any;
  amountForm!: FormGroup;
  constructor(
    private paypalService: PaypalApiService,
    private _fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.amountForm = this._fb.group({
      amount: [null, [Validators.required]],
    });
  }
  createPayment(body: any) {
    this.paypalService.createPayment(body).subscribe((res: any) => {
      console.log(res);

      this.links = res['links'];
      console.log(this.links);
      for (let i = 0; i < this.links.length; i++) {
        if (this.links[i].rel === 'approval_url') {
          window.open(this.links[i].href, '_blank')?.focus();
          return;
        }
      }
    });
  }
  onCreatePayment() {
    let body = {
      amount: this.amountForm.value.amount,
      currencyCode: 'USD',
    };
    this.createPayment(body);
  }
}
