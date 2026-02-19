import { Component } from '@angular/core';
import { CustomerService } from '../../services/customerService';
import { Observable, tap } from 'rxjs';
import { Customer } from '../../models/customerModel';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface Column {
  field: any;
  header: string;
}

@Component({
  selector: 'app-customers-table-component',
  imports: [TableModule, CommonModule, DialogModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './customersTableComponent.html',
  styleUrl: './customersTableComponent.css',
})
export class CustomersTableComponent {

  customers$: Observable<Customer[]>;

  columns: Column[] = [
    // { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nome' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Telefono' },
    { field: 'active', header: 'Attivo' },
  ];

  selectedCustomer: Customer | null = null;

  isDialogVisible: boolean = false;

  // formData: any = {};

  constructor(private customerService: CustomerService) {
    this.customers$ = this.customerService.getCustomers();
  }

  ngOnInit(): void {

    //debug
    console.log(this.customers$.pipe(tap(customers => console.log(customers))));

  }

  onRowClick(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isDialogVisible = true;
    console.log(this.selectedCustomer);
  }

  onSave(): void {
    console.log('Saved:', this.selectedCustomer);
    this.isDialogVisible = false;
  }

  onCancel(): void {
    this.isDialogVisible = false;
    this.selectedCustomer = null;
  }



}
