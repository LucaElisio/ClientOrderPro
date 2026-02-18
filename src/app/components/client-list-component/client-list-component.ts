import { Component } from '@angular/core';
import { ClientService } from '../../services/client-service';
import { Observable, tap } from 'rxjs';
import { Client } from '../../models/client-model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

interface Column {
  field: string;
  header: string;
}


@Component({
  selector: 'app-client-list-component',
  imports: [TableModule, CommonModule],
  templateUrl: './client-list-component.html',
  styleUrl: './client-list-component.css',
})
export class ClientListComponent {

  clients$: Observable<Client[]>;
  columns: Column[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'active', header: 'Active' },
  ];

  constructor(private clientService: ClientService) {
    this.clients$ = this.clientService.getClients();
  }

  ngOnInit(): void {

    //debug
    console.log(this.clients$.pipe(tap(clients => console.log(clients))));

  }

}
