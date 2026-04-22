import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  public movie: MovieResponse | undefined;
  public movies: Movie[] = [];
  public videosRelacionados: any[] = [];
  public posters: any[] = [];
  public cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const { id } = params;

      this.movie = undefined;
      this.movies = [];
      this.videosRelacionados = [];
      this.posters = [];
      this.cast = [];

      this.peliculasService.getPeliculaDetalle(id).subscribe((data: any) => {
        this.movie = data;
      });

      this.peliculasService.getVideosRelacionado(id).subscribe((data: any) => {
        this.videosRelacionados = data?.results ?? [];
      });

      this.peliculasService.getSimilar(id).subscribe((data: any) => {
        this.movies = data?.results ?? [];
      });

      this.peliculasService.getImagenes(id).subscribe((data: any) => {
        this.posters = data?.posters ?? [];
      });

      this.peliculasService.getCast(id).subscribe((castData: Cast[]) => {
        this.cast = castData;
      });
    });
  }

  abrirVideo(videoKey: string) {
    window.open(`https://www.youtube.com/watch?v=${videoKey}`, '_blank');
  }

  generateYoutubeThumbnailUrl(videoKey: string): string {
    return `https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`;
  }

  generateImageUrl(imagePath: string): string {
    return `https://image.tmdb.org/t/p/w342${imagePath}`;
  }

  getBackdropUrl(): string {
    if (this.movie?.backdrop_path) {
      return `https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}`;
    }
    return '';
  }

  getRuntime(): string {
    if (!this.movie?.runtime) return '';
    const h = Math.floor(this.movie.runtime / 60);
    const m = this.movie.runtime % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }
}
