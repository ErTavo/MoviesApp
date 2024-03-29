import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  buscarPelicula(text:string){
    console.log("texto buscado es: "+text)
    text = text.trim();
    if (text.length == 0) return;
    this.router.navigate(['/buscar',text]);
  }

}
