/*
============================================
; Title: invoice.ts
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 01 October 2021
; Description: Invoice TS file
;===========================================
*/

// import statements
import { LineItem } from "./line-item.interface";

// export Invoice class
export class Invoice {
    private username: string;
    private lineItems: LineItem[]
    private orderDate: string;
    private LABOR_RATE: number = 50;

    partsAmount: number;
    laborHours: number;

    constructor(username?: string, partsAmount?: number, laborHours?: number) {
        this.username = username || '';
        this.partsAmount = partsAmount || 0;
        this.laborHours = laborHours || 0;
        this.orderDate = new Date().toLocaleDateString()
        this.lineItems = [];
    }

    getUsername(): string {
        return this.username;
    }

    setLineItems(lineItems: LineItem[]): void {
        this.lineItems = lineItems;
    }

    getLineItems(): LineItem[] {
        return this.lineItems;
    }

    getLineItemTotal(): number {
        let total = 0;
        for (let lineItem of this.lineItems) {
            total += lineItem.price;
        }

        return Number(total);
    }

    getLaborAmount(): number {
        return Number(this.laborHours) * Number(this.LABOR_RATE);
    }

    getOrderDate(): string {
        return this.orderDate;
    }
    
    getTotal(): number {
        return Number(this.partsAmount) + Number(this.getLaborAmount()) + Number(this.getLineItemTotal());
    }

    clear() {
        this.partsAmount = 0;
        this.laborHours = 0;
        this.lineItems = [];
    }
}