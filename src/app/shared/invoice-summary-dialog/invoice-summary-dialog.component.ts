/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 1 Oct 2021
 * Title: invoice-summary-dialog.component.ts
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../invoice';
import { InvoiceService } from '../invoice.service';
import { Router } from "@angular/router";
import  {Message } from 'primeng/api/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {

  invoice: Invoice;
  username: string;
  orderDate: string;
  total: number;
  labor: number;
  parts: number;
  successMessages: Message[];

  constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, private invoiceService: InvoiceService, private router: Router, @Inject(MAT_DIALOG_DATA) data) {
    this.invoice = data.invoice;

    console.log(`Parts amount: ${this.invoice.partsAmount}`)
    console.log(`Labor amount: ${this.invoice.getLaborAmount()}`)

    this.username = this.invoice.getUsername();
    this.orderDate = this.invoice.getOrderDate();
    this.parts = this.invoice.partsAmount;
    this.labor = this.invoice.getLaborAmount();
    this.total = this.invoice.getTotal();
    
   }

   
  ngOnInit() {
    
    }

  confirmOrder(): void {
    this.invoiceService.createInvoice(this.username, this.invoice).subscribe(
      (res) => {
        this.router.navigate(["/"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
