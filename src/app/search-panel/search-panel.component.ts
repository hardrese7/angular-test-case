import { ClientsService } from '../clients.service';
import {
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  public term$ = new Subject<string>();
  constructor(private clientsService: ClientsService) {}

  public ngOnInit() {
    this.term$
    .debounceTime(200)
    .subscribe((term) => this.filterClients(term));
  }

  public filterClients(term: string) {
    this.clientsService.filterClients(term);
  }
}
