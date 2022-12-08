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
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from 'src/environments/environment.prod';
import { CinemaSeatComponent } from './components/cinema-seat/cinema-seat.component';
import { BookingListMovieComponent } from './booking-list-movie/booking-list-movie.component';
import { HistoryScoreComponent } from './components/history-score/history-score.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { ShowTimesComponent } from './components/show-times/show-times.component';
import { ConfirmTicketComponent } from './components/confirm-ticket/confirm-ticket.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { AddEmployeeFormComponent } from './components/add-employee-form/add-employee-form.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

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
    RegisterComponent,
    NotFoundPageComponent,
    CinemaComponent,
    CinemaSeatComponent,
    BookingListMovieComponent,
    HistoryScoreComponent,
    MovieDetailPageComponent,
    ShowTimesComponent,
    ConfirmTicketComponent,
    BookingHistoryComponent,
    ListEmployeeComponent,
    AddEmployeeFormComponent,
    EditEmployeeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    // AngularFireStorageModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
