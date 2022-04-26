import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ReposComponent } from './components/repos/repos.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import {MatInputModule} from "@angular/material/input";

const appRoutes: Routes = [
  {path: '', component: ReposComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReposComponent,
    RepoItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
