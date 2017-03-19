import { HighlightPipe } from '../highlight.pipe';
import { Client } from '../models';
import { ClientsService } from '../clients.service';
import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss'],
  providers: [HighlightPipe]
})
export class DetailsPanelComponent implements OnInit {
  constructor(private clientsService: ClientsService) {

  }
  term: string;
  errorMessage: any;
  client: Client;
  clientsNotFound: boolean;

  public ngOnInit() {
    this.clientsService.clientSelected$.subscribe(
      (client) => {
        this.client = client;
        this.clientsNotFound = false;
      },
      (error) => this.errorMessage = error
    );
    this.clientsService.clientsFiltered$.subscribe(
      (term) => {
        this.term = term;
      },
      (error) => this.errorMessage = error
    );
    this.clientsService.clientsNotFound$.subscribe(
      (notFound) => {
        this.clientsNotFound = notFound;
        if(notFound){
          this.client = null;
        }
      },
      (error) => this.errorMessage = error
    )
  }
}
