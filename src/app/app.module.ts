import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CastSlideshowComponent } from './components/cast-slideshow/cast-slideshow.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PeliculasPosterGridComponent } from './components/peliculas-poster-grid/peliculas-poster-grid.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { PosterPipe } from './pipes/poster.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NguCarouselModule } from '@ngu/carousel';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscarComponent,
    PeliculaComponent,
    PeliculasPosterGridComponent,
    PosterPipe,
    CastSlideshowComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NguCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
