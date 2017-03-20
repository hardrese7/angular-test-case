import {
  Component,
  OnInit,
} from '@angular/core';
@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `StartPage` component');
  }

}
