import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { query } from '@angular/animations';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsReponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private CarteleraPage = 1;
  public cargando : boolean = false;
  constructor(private http: HttpClient) { }

  get params(){
    return{
      api_key:'041f8e9ee316bbcfbadd13f9a0e813aa',
      language: 'es-MX',
      page: this.CarteleraPage.toString()
    }
  }
  resetCartelera(){
    this.CarteleraPage=1;
  }

  getCartelera(): Observable<Movie[]>{
  if (this.cargando){
  return of([])
}

this.cargando = true;
return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
params: this.params
}).pipe(
  map(response => response.results),
  tap(()=>{
    this.CarteleraPage =+1;
    this.cargando=false;
      })
    )
  }

buscarPeliculas(texto: string): Observable<Movie[]>{
  const params = {...this.params, page: 1, query: texto}
  console.log(params)
  return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
  params
  }).pipe(
    map (response => response.results)
  )
}

getPeliculaDetalle (id:string){
  return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${ id }`,{
    params: this.params
  }).pipe(
  catchError(error=> of(null))
  )
}

getVideosRelacionado (id:string){
  return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${ id }/videos`,{
    params: this.params
  }).pipe(
  catchError(error=> of(null))
  )
}

getSimilar(id:string){
  return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${ id }/similar`,{
    params: this.params
  }).pipe(
    catchError(error => of(null))
  )}

getCast(id:string):Observable<Cast[]>{
  return this.http.get<CreditsReponse>(`${this.baseUrl}/movie/${ id }/credits`,{
    params: this.params
}).pipe(
  map(response => response.cast ),
  catchError(error => of([]))
    )
  }
}
