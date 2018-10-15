import './styles.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FsExampleModule } from '@firestitch/example';
import { FsListModule } from '@firestitch/list';
import { FsScrollModule } from '@firestitch/scroll';

import { AppMaterialModule } from './app/material.module';
import { MainComponent } from './app/components/main/main.component';
import {  TabAComponent,
          TabBComponent,
          TabCComponent,
          TabDComponent,
          TabsComponent,
          MenuAComponent,
          MenuBComponent,
          MenuCComponent,
          MenuDComponent,
          ListComponent,
          EditComponent,
          Workflow1Component,
          Workflow2Component,
          Workflow3Component,
          RootComponent} from './app/components';
import { HeaderComponent } from './app/components/header/header.component';
import { NavigationComponent } from './app/components/navigation/navigation.component';

import {
  FsNavModule
} from '../src';

const appRoutes: Routes = [
  { path: 'menu/a', component: MenuAComponent, data: { FsNav: { root: true } } },
  { path: 'menu/b', component: MenuBComponent, data: { FsNav: { root: true } } },
  { path: 'menu/c', component: MenuCComponent, data: { FsNav: { root: false } } },
  { path: 'menu/d', component: MenuDComponent, data: { FsNav: { root: true } } },
  { path: 'list', component: ListComponent },
  { path: 'edit', component: EditComponent, data: { }   },
  { path: 'tabs', component: TabsComponent, data: { FsNav: { lastChild: true }}, children:
    [
      { path: '', redirectTo: 'a', pathMatch: 'full'},
      { path: 'a', component: TabAComponent },
      { path: 'b', component: TabBComponent },
      { path: 'c', component: TabCComponent },
      { path: 'd', component: TabDComponent },
    ]
  },
  { path: 'workflow', children:
    [
      { path: '1', component: Workflow1Component, data: { FsNav: { history: false } } },
      { path: '2', component: Workflow2Component, data: { FsNav: { history: false } } },
      { path: '3', component: Workflow3Component, data: { FsNav: { history: false } } },
    ]
  },
  { path: '', pathMatch: 'full', component: RootComponent, data: { FsNav: { root: true } } },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsNavModule.forRoot(),
    FsListModule.forRoot(),
    FsScrollModule.forRoot(),
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
    TabAComponent,
    TabBComponent,
    TabCComponent,
    TabDComponent,
    MenuAComponent,
    MenuBComponent,
    MenuCComponent,
    MenuDComponent,
    HeaderComponent,
    NavigationComponent,
    ListComponent,
    EditComponent,
    Workflow1Component,
    Workflow2Component,
    Workflow3Component,
    RootComponent
  ],
})
export class PlaygroundModule {
}
