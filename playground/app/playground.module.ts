import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { FsExampleModule } from '@firestitch/example';
import { FsListModule } from '@firestitch/list';
import { FsMessageModule } from '@firestitch/message';
import { FsNavModule, } from '@firestitch/nav';
import { FsPromptModule } from '@firestitch/prompt';
import { FsScrollModule } from '@firestitch/scroll';
import { FsSelectionModule } from '@firestitch/selection';


import { AppComponent } from './app.component';
import {
  EditComponent,
  ListComponent,
  MenuAComponent,
  MenuBComponent,
  MenuCComponent,
  MenuDComponent,
  RootComponent,
  SuperTabAComponent,
  SuperTabBComponent,
  SuperTabCComponent,
  SuperTabDComponent,
  SuperTabsComponent,
  TabAComponent,
  TabBComponent,
  TabCComponent,
  TabDComponent,
  TabsComponent,
  Workflow1Component,
  Workflow2Component,
  Workflow3Component
} from './components';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppMaterialModule } from './material.module';


const appRoutes: Routes = [
  { path: 'menu/a', component: MenuAComponent, data: { fsNav: { root: true } } },
  { path: 'menu/b', component: MenuBComponent, data: { fsNav: { root: true } } },
  { path: 'menu/c', component: MenuCComponent, data: { fsNav: { root: false } } },
  { path: 'menu/d', component: MenuDComponent, data: { fsNav: { root: true } } },
  { path: 'list', component: ListComponent },
  { path: 'edit', component: EditComponent, data: {} },
  {
    path: 'tabs',
    component: TabsComponent,
    data: {
      fsNav: {
        lastChild: true
      },
    },
    children:
      [
        { path: '', redirectTo: 'a', pathMatch: 'full' },
        { path: 'a', component: TabAComponent },
        { path: 'b', component: TabBComponent },
        { path: 'c', component: TabCComponent },
        { path: 'd', component: TabDComponent },
      ]
  },
  {
    path: 'another-tabs',
    component: SuperTabsComponent,
    data: { fsNav: { lastChild: true } },
    children:
      [
        { path: '', redirectTo: 'a', pathMatch: 'full' },
        { path: 'a', component: SuperTabAComponent },
        { path: 'b', component: SuperTabBComponent },
        { path: 'c', component: SuperTabCComponent },
        { path: 'd', component: SuperTabDComponent },
      ]
  },
  {
    path: 'workflow', children:
      [
        { path: '1', component: Workflow1Component, data: { fsNav: { history: false } } },
        { path: '2', component: Workflow2Component, data: { fsNav: { history: false } } },
        { path: '3', component: Workflow3Component, data: { fsNav: { history: false } } },
      ]
  },
  { path: '', pathMatch: 'full', component: RootComponent, data: { fsNav: { root: true } } },
];

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FsNavModule.forRoot(),
        FsListModule.forRoot(),
        FsScrollModule.forRoot(),
        FsSelectionModule,
        FsPromptModule.forRoot(),
        BrowserAnimationsModule,
        AppMaterialModule,
        FormsModule,
        FsExampleModule.forRoot(),
        FsMessageModule.forRoot(),
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
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
        RootComponent,
    ]
})
export class PlaygroundModule {
}
