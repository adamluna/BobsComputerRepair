/**
 * Title: BCRS - Home Component
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim, Adam Luna, Mark Watson
 * Date: 21 Sept 2021
 * Description: Home component TS file.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { InvoiceSummaryDialogComponent } from './../../shared/invoice-summary-dialog/invoice-summary-dialog.component';
import { Invoice } from './../../shared/invoice';
import { Product } from './../../shared/product.interface';
import { InvoiceService } from './../../shared/invoice.service';
import { ProductService } from './../../shared/product.service';
import { LineItem } from '../../shared/line-item.interface';
import { Message } from 'primeng/api/message';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  username: string;
  products: Product[];
  lineItems: LineItem[];
  invoice: Invoice;
  errorMessages: Message[];
  successMessages: Message[];

  constructor(private cookieService: CookieService, private fb: FormBuilder, private router: Router,
  private productService: ProductService, private invoiceService: InvoiceService, private dialogRef: MatDialog) { 
    this.username = this.cookieService.get('sessionuser');
    this.products = this.productService.getProducts();
    this.invoice = new Invoice(this.username);
    this.lineItems = [];

    console.log(this.products);
  }

  ngOnInit(): void {}

  /**
   * Create an invoice for a user
   */
  generateInvoice() {
    console.log('generateInvoice() this.invoice');
    console.log(this.invoice);

    console.log('generateInvoice() this.products');
    console.log(this.products);

    for (let product of this.products) {
      if (product.checked) {
        this.lineItems.push(product);
      }
    }

    // show invoice summary if there are any items
    if (this.lineItems.length > 0) {
      this.invoice.setLineItems(this.lineItems);

      console.log('lineItems.length > 0; this.invoice');
      console.log(this.invoice);

      const dialogRef = this.dialogRef.open(InvoiceSummaryDialogComponent, {
        data: {
          invoice: this.invoice
        },
        disableClose: true,
        width: '800px'
      });

      dialogRef.afterClosed().subscribe(result => {
        // create invoice if user confirms
        if (result === 'confirm') {
          this.invoiceService.createInvoice(this.username, this.invoice).subscribe(res => {
            console.log('Invoice created');
            this.reloadProducts();
            this.clearLineItems();
            this.invoice.clear();
            this.successMessages = [
              {severity: 'success', summary: 'Success', detail: 'Your order has been processed successfully.'}
            ]
          })
        // otherwise, cancel order
        } else {
          console.log('order canceled');
          this.reloadProducts();
          this.clearLineItems();
          this.invoice.clear();
        }
      })
    // on error
    } else {
      this.errorMessages = [
        {severity: 'error', summary: 'Error', detail: 'You must select at least one service.'}
      ]
    }
  }


  /**
   * Uncheck all products
   */
  reloadProducts() {
    for (let product of this.products) {
      product.checked = false;
    }
  }

  /**
   * Empty line items
   */
  clearLineItems() {
    this.lineItems = [];
  }

}
