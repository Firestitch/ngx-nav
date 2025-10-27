import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { NavigationComponent } from './components/navigation/navigation.component';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    standalone: true,
    imports: [FsExampleModule, NavigationComponent]
})
export class AppComponent {

  public config = environment;

  constructor() {}
}
