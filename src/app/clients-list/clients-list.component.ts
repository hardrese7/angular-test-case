import { ClientsService } from '../clients.service';
import { AppService } from '../app.service';
import { Client } from '../models';
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
  public clients: Client[];
  public filteredClients: Client[];
  // I can use pipe, but angular documentation doesn't recommend it for filtering porposes
  public errorMessage: any;
  public selectedClient: Client;
  public term: string;
  constructor(private appService: AppService, public clientsService: ClientsService) {

  }

  public ngOnInit() {
    this.clientsService.clientsFiltered$.subscribe(
      (term) => {
        this.term = term;
        this.filterClients();
      },
      (error) => this.errorMessage = error
    );
    return this.getClients();
  }

  public getClients() {
    return this.appService.getClients()
      .subscribe(
      (clients) => {
        this.clients = clients;
        this.filterClients();
      },
      (error) => this.errorMessage = <any> error);
  }

  public searchTermInObject(object): boolean {
    return Object.keys(object).some((key) => {
      switch (typeof object[key]) {
        case 'string':
          return object[key].toLowerCase().indexOf(this.term.toLowerCase()) > -1;
        case 'number':
          return object[key] === +this.term;
        case 'object':
          return object[key] === null ? false : this.searchTermInObject(object[key]);
        default:
          return false;
      }

    });
  }

  public filterClients() {
    if (!this.term) {
      this.filteredClients = this.clients;
    } else {
      this.filteredClients = this.clients.filter(this.searchTermInObject.bind(this));
    }
    this.notifyAboutFoundClients();
  }

  public notifyAboutFoundClients() {
    if (!this.filteredClients.length) {
      this.clientsService.clientsNotFound(true);
    } else {
      this.clientsService.clientsNotFound(false);
    }
  }

  public selectClient(client: Client) {
    if (!client) {
      throw Error('you tried to select empty client');
    }
    this.selectedClient = client;
    this.clientsService.selectClient(client);
  }

}
