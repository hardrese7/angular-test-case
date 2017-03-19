import { ClientsService } from '../clients.service';
import { AppService } from '../app.service';
import { Client } from "../models"
import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  constructor(private appService: AppService, private clientsService: ClientsService) {

  }
  clients: Client[];
  filteredClients: Client[];// I can use pipe, but angular documentation doesn't recommend it for filtering porposes
  errorMessage: any;
  selectedClient: Client;
  term: string;

  public ngOnInit() {
    this.clientsService.clientsFiltered$.subscribe(
      (term) => {
        this.term = term;
        this.filterClients();
      },
      (error) => this.errorMessage = error
    );
    this.getClients();
  }

  getClients() {
    this.appService.getClients()
      .subscribe(
      (clients) => {
        this.clients = clients;
        this.filterClients()
      },
      (error) => this.errorMessage = <any>error);
  }

  searchTermInObject(object) {
    return Object.keys(object).some((key) => {
      switch (typeof object[key]) {
        case "string":
          return object[key].toLowerCase().indexOf(this.term.toLowerCase()) > -1;
        case "number":
          return object[key] === +this.term;
        case "object":
          return object[key] === null ? false : this.searchTermInObject(object[key])
        default:
          return false;
      }

    })
  }

  filterClients() {
    if (!this.term) {
      this.filteredClients = this.clients;
      return;
    }
    this.filteredClients = this.clients.filter(this.searchTermInObject.bind(this));
  }

  selectClient(client: Client) {
    this.selectedClient = client;
    this.clientsService.selectClient(client);
  }

}
