import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AddMovieFormComponent } from './components/add-movie-form/add-movie-form.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { WrapperOutletComponent } from './components/wrapper-outlet/wrapper-outlet.component';
import { ListMovieComponent } from './components/list-movie/list-movie.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ListSearchComponent } from './components/list-search/list-search.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { BookingSeatComponent } from './components/booking-seat/booking-seat.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AddMovieFormComponent,
    MenuBarComponent,
    WrapperOutletComponent,
    ListMovieComponent,
    LoaderComponent,
    ListSearchComponent,
    BookingSeatComponent,
    UserProfileComponent,
    AccountInfoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
