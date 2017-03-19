import { Client } from './models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ClientsService {

  // Observable string sources
  private clientSelectedSource = new Subject<Client>();
  private clientsFilteredSource = new Subject<string>();
  private clientsNotFoundSource = new Subject<boolean>();
  // Observable string streams
  clientSelected$ = this.clientSelectedSource.asObservable();
  clientsFiltered$ = this.clientsFilteredSource.asObservable();
  clientsNotFound$ = this.clientsNotFoundSource.asObservable();
  // Service message commands
  selectClient(client: Client) {
    this.clientSelectedSource.next(client);
  }
  filterClients(term: string){
    this.clientsFilteredSource.next(term);
  }
  clientsNotFound(notFound: boolean){
    this.clientsNotFoundSource.next(notFound);
  }
}
