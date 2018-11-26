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
  SuperTabAComponent,
  SuperTabBComponent,
  SuperTabCComponent,
  SuperTabDComponent,
  SuperTabsComponent,
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

import { FsNavModule, } from '../src';


const appRoutes: Routes = [
  { path: 'menu/a', component: MenuAComponent, data: { fsNav: { root: true } } },
  { path: 'menu/b', component: MenuBComponent, data: { fsNav: { root: true } } },
  { path: 'menu/c', component: MenuCComponent, data: { fsNav: { root: false } } },
  { path: 'menu/d', component: MenuDComponent, data: { fsNav: { root: true } } },
  { path: 'list', component: ListComponent },
  { path: 'edit', component: EditComponent, data: { }   },
  { path: 'tabs', component: TabsComponent, data: { fsNav: { lastChild: true }}, children:
      [
        { path: '', redirectTo: 'a', pathMatch: 'full'},
        { path: 'a', component: TabAComponent },
        { path: 'b', component: TabBComponent },
        { path: 'c', component: TabCComponent },
        { path: 'd', component: TabDComponent },
      ]
  },
  { path: 'another-tabs', component: SuperTabsComponent, data: { fsNav: { lastChild: true }}, children:
      [
        { path: '', redirectTo: 'a', pathMatch: 'full'},
        { path: 'a', component: SuperTabAComponent },
        { path: 'b', component: SuperTabBComponent },
        { path: 'c', component: SuperTabCComponent },
        { path: 'd', component: SuperTabDComponent },
      ]
  },
  { path: 'workflow', children:
      [
        { path: '1', component: Workflow1Component, data: { fsNav: { history: false } } },
        { path: '2', component: Workflow2Component, data: { fsNav: { history: false } } },
        { path: '3', component: Workflow3Component, data: { fsNav: { history: false } } },
      ]
  },
  { path: '', pathMatch: 'full', component: RootComponent, data: { fsNav: { root: true } } },
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
    FsExampleModule.forRoot(),
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
    SuperTabAComponent,
    SuperTabBComponent,
    SuperTabCComponent,
    SuperTabDComponent,
    SuperTabsComponent,
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
