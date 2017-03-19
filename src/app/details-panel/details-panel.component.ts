import { Client } from '../models';
import { ClientsService } from '../clients.service';
import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss']
})
export class DetailsPanelComponent implements OnInit {
  constructor(private clientsService: ClientsService) {

  }
  client: Client;
  error: any;
  public ngOnInit() {
    this.clientsService.clientSelected$.subscribe(
      (client) => this.client = client,
      (error) => this.error = error
    );
  }
}
