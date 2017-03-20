import { Observable } from 'rxjs/Rx';
import { Client } from './models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ClientsService {

  // Observable string streams
  public clientSelected$: Observable<Client>;
  public clientsFiltered$: Observable<string>;
  public clientsNotFound$: Observable<boolean>;

  // Observable string sources
  private clientSelectedSource: Subject<Client>;
  private clientsFilteredSource: Subject<string>;
  private clientsNotFoundSource: Subject<boolean>;

constructor() {
  this.clientSelectedSource = new Subject<Client>();
  this.clientsFilteredSource = new Subject<string>();
  this.clientsNotFoundSource = new Subject<boolean>();
  this.clientSelected$ = this.clientSelectedSource.asObservable();
  this.clientsFiltered$ = this.clientsFilteredSource.asObservable();
  this.clientsNotFound$ = this.clientsNotFoundSource.asObservable();
}

  // Service message commands
  public selectClient(client: Client) {
    this.clientSelectedSource.next(client);
  }
  public filterClients(term: string) {
    this.clientsFilteredSource.next(term);
  }
  public clientsNotFound(notFound: boolean) {
    this.clientsNotFoundSource.next(notFound);
  }
}
