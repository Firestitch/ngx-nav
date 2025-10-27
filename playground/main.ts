import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsNavModule } from '@firestitch/nav';
import { FsListModule } from '@firestitch/list';
import { FsScrollModule } from '@firestitch/scroll';
import { FsSelectionModule } from '@firestitch/selection';
import { FsPromptModule } from '@firestitch/prompt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { provideRouter, Routes } from '@angular/router';
import { MenuAComponent, MenuBComponent, MenuCComponent, MenuDComponent, ListComponent, EditComponent, TabsComponent, TabAComponent, TabBComponent, TabCComponent, TabDComponent, SuperTabsComponent, SuperTabAComponent, SuperTabBComponent, SuperTabCComponent, SuperTabDComponent, Workflow1Component, Workflow2Component, Workflow3Component, RootComponent } from './app/components';
import { AppComponent } from './app/app.component';

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



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsNavModule.forRoot(), FsListModule.forRoot(), FsScrollModule.forRoot(), FsSelectionModule, FsPromptModule.forRoot(), FormsModule, FsExampleModule.forRoot(), FsMessageModule.forRoot()),
        provideAnimations(),
        provideRouter(appRoutes)
    ]
})
  .catch(err => console.error(err));

