import { Client } from './models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ClientsService {

  // Observable string sources
  private clientSelectedSource = new Subject<Client>();
  // Observable string streams
  clientSelected$ = this.clientSelectedSource.asObservable();
  // Service message commands
  selectClient(client: Client) {
    this.clientSelectedSource.next(client);
  }
}
