import { ClientsService } from '../clients.service';
import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  constructor(private clientsService: ClientsService) {
    
  }
  term: string;

  public ngOnInit() {
  }

  filterClients(){
    this.clientsService.filterClients(this.term);
  }
}
