import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service.service';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from 'src/app/interfaces/movie-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  public movie: MovieResponse | undefined;
  public movies: Movie[] = [];
  public videosRelacionados: any[] = [];

  constructor(private ActivatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: any) => {
      const {id} = params;
      this.peliculasService.getPeliculaDetalle(id).subscribe((data:any) => {
        this.movie = data;
        console.log(this.movie);


      })

      this.peliculasService.getVideosRelacionado(id).subscribe((data: any) => {
        console.log(data);
        this.videosRelacionados = data.results;
      });


      this.peliculasService.getSimilar(id).subscribe((data:any) => {
        console.log(data);
        this.movies = data.results;
      })
    })
  }
  abrirVideo(videoKey: string) {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
    window.open(youtubeUrl, '_blank');
  }
  generateYoutubeThumbnailUrl(videoKey: string) {
    return `https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`;
  }

}

