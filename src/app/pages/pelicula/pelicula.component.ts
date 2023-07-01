import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service.service';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { NguCarouselConfig } from '@ngu/carousel';


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

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
    slide: 1,
    speed: 400,
    interval: {
      timing: 3000,
      initialDelay: 1000
    },
    point: {
      visible: true
    },
    load: 2,
    touch: true,
    loop: true
  };

  constructor(private ActivatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService) { }


  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: any) => {
      const {id} = params;
      this.peliculasService.getPeliculaDetalle(id).subscribe((data:any) => {
        this.movie = data;
      })

      this.peliculasService.getVideosRelacionado(id).subscribe((data: any) => {
        this.videosRelacionados = data.results;
      });


      this.peliculasService.getSimilar(id).subscribe((data:any) => {
        this.movies = data.results;
      });

      this.peliculasService.getImagenes(id).subscribe((data:any) => {
        console.log(data)
        this.posters = data.posters;
      });


    })
  }

  abrirVideo(videoKey: string) {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoKey}`;
    window.open(youtubeUrl, '_blank');
  }
  generateYoutubeThumbnailUrl(videoKey: string) {
    return `https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`;
  }
  generateImageUrl(imagePath: string): string {
    return `https://api.themoviedb.org/3/${imagePath}`;
  }

}

