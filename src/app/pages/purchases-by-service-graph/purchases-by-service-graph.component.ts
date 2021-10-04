/*
============================================
; Title: purchases-by-service-graph.component.ts
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 02 October 2021
; Description: purchases-by-service-graph component TS file
;===========================================
*/
// import statements
import { Component, OnInit } from "@angular/core";
import { InvoiceService } from "../../shared/invoice.service";


@Component({
  selector: "app-purchases-by-service-graph",
  templateUrl: "./purchases-by-service-graph.component.html",
  styleUrls: ["./purchases-by-service-graph.component.css"],
})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    // call purchases-graph API
    this.invoiceService.findPurchasesByServiceGraph().subscribe(res => {
      // map the response data to the purchases variable
      this.purchases = res['data'];

      // loop over the purchases to split out the services and item count
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      // built the object literal for the prime ng bar graph
      this.data = {
        labels: this.labels, // label for services
        datasets: [
          // graph object
          {
            backgroundColor: [
              "#ED0A3F",
              "#FF8833",
              "#5FA777",
              "#0066CC",
              "#6B3FA0",
              "#AF593E",
              "#6CDAE7",
            ],
            hoverBackgroundColor: [
              "#ED0A3F",
              "#FF8833",
              "#5FA777",
              "#0066CC",
              "#6B3FA0",
              "#AF593E",
              "#6CDAE7",
            ],
            data: this.itemCount,
          },
        ]
      };

      // verify the data objects structure matches prime ng's expected format
      console.log("Data object");
      console.log(this.data);
    })
  }

  ngOnInit() {
  }
}
