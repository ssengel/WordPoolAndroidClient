import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { MainComponent } from './components/main/main.component'
import { HeaderComponent } from './components/header/header.component';
import { WallComponent } from './components/wall/wall.component'
import { AuthGuard } from './guards/auth.guard';
import { PoolComponent } from './components/pool/pool.component';
import { AuthInterceptor } from './intercepters/auth-interceptor';
import { CreateWordComponent } from './components/create-word/create-word.component';
import { HttpErrorInterceptor } from './intercepters/http-error-interceptor';
import { RandomComponent } from './components/random/random.component';


const routerConfig: Route[] = [
  {
    canActivate:[AuthGuard],
    path:'',
    component: MainComponent,
    children:[
      { path: '', redirectTo: 'pool', pathMatch: 'full' ,canActivate:[AuthGuard]},
      { path: 'pool', component: PoolComponent ,canActivate:[AuthGuard]},
      { path: 'createWord', component: CreateWordComponent ,canActivate:[AuthGuard]},
      { path: 'random', component: RandomComponent ,canActivate:[AuthGuard]}

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    MainComponent,
    HeaderComponent,
    WallComponent,
    PoolComponent,
    CreateWordComponent,
    RandomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routerConfig),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
