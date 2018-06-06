import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FsExampleModule } from '@firestitch/example';

import { AppMaterialModule } from './app/material.module';
import { MainComponent } from './app/components/main/main.component';
import { TabsComponent } from './app/components/tabs/tabs.component';
import { ListComponent } from './app/components/tabs/list/list.component';
import { InputsDataComponent } from './app/components/tabs/inputs-data/inputs-data.component';
import { MessagesComponent } from './app/components/messages/messages.component';
import { StaticPageComponent } from './app/components/tabs/static-page/static-page.component';
import { HeaderComponent } from './app/components/header/header.component';
import { NavigationComponent } from './app/components/navigation/navigation.component';
import { UsersComponent } from './app/components/users/users.component';
import { AccountsComponent } from './app/components/accounts/accounts.component';

import {
  FsNavModule,
  FsNavRouteHandleService
} from '../src';

const appRoutes: Routes = [
  { path: '', component: MainComponent, data: { fsNavRoot: true } },
  { path: 'messages', component: MessagesComponent, data: { fsNavRoot: true } },
  { path: 'accounts', component: AccountsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'tabs', component: TabsComponent, children: [
    { path: '', redirectTo: '/tabs/list', pathMatch: 'full'},
    { path: 'list', component: ListComponent },
    { path: 'static-page', component: StaticPageComponent },
    { path: 'data-inputs', component: InputsDataComponent },
  ] },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsNavModule,
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
    TabsComponent,
    ListComponent,
    MessagesComponent,
    InputsDataComponent,
    StaticPageComponent,
    HeaderComponent,
    NavigationComponent,
    AccountsComponent,
    UsersComponent
  ],
  providers: [
    FsNavRouteHandleService
  ],
})
export class PlaygroundModule {
}
