import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FsComponentModule } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app/material.module';
import { FsExampleModule } from '@firestitch/example';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './app/components/main/main.component';
import { SecondComponent } from './app/components/second/second.component';
import { CustomReuseStrategy } from './custom-strategy.router';
import { ThirdComponent } from './app/components/third/third.component';
import { SecondChildComponent } from './app/components/second/second-child/second-child.component';
import { TabsComponent } from './app/components/tabs/tabs.component';
import { ListComponent } from './app/components/tabs/list/list.component';
import { BigPictureComponent } from './app/components/tabs/big-picture/big-picture.component';
import { InputsDataComponent } from './app/components/tabs/inputs-data/inputs-data.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'second', component: SecondComponent },
  { path: 'second/second-child', component: SecondChildComponent },
  { path: 'third', component: ThirdComponent },
  { path: 'tabs', component: TabsComponent, children: [
    { path: '', redirectTo: '/tabs/list', pathMatch: 'full'},
    { path: 'list', component: ListComponent },
    { path: 'big-picture', component: BigPictureComponent },
    { path: 'data-inputs', component: InputsDataComponent },
  ] },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsComponentModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule,
    RouterModule.forRoot(appRoutes),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    MainComponent,
    SecondComponent,
    SecondChildComponent,
    ThirdComponent,
    TabsComponent,
    ListComponent,
    BigPictureComponent,
    InputsDataComponent,
  ],
  providers: [
    {
      provide: RouteReuseStrategy, useClass: CustomReuseStrategy
    }
  ],
})
export class PlaygroundModule {
}
