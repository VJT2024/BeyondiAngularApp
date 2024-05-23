import { Component } from '@angular/core';
import { AppState } from './store/app.state';
import { State, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppStateModel } from './app.model';

    
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
@Select(AppState.userDetails)
userDetails$: Observable<string>;
  constructor(private store: Store){}
  title = 'beyondiAngularApp';

  ngOnInit() {
    this.userDetails$.subscribe(res => console.log(res));
}
}
