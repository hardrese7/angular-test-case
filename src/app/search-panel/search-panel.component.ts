import { ClientsService } from '../clients.service';
import {
  Component,
  OnInit,
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime'


@Component({
  selector: 'search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  constructor(private clientsService: ClientsService) {
    
  }
  term$ = new Subject<string>();

  public ngOnInit() {
    this.term$
    .debounceTime(200)
    .subscribe(term => this.filterClients(term))
  }

  filterClients(term: string){
    this.clientsService.filterClients(term);
  }
}
