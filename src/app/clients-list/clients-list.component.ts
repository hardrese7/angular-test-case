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
  errorMessage: any;
  selectedClient: Client;
  public ngOnInit() {
    this.getClients();
  }
  getClients() {
    this.appService.getClients()
      .subscribe(
      (clients) => {
        this.clients = clients
      },
      (error) => this.errorMessage = <any>error);
  }
  selectClient(client: Client){
    this.selectedClient = client;
    this.clientsService.selectClient(client);
  }

}
