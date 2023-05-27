import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service.service';
import { HomeComponent } from '../pages/home/home.component';
import { __importDefault } from 'tslib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent {
  @Input()
  movies!:Movie[];
  constructor(private router: Router){}
  ngOnInit(): void{}
}
