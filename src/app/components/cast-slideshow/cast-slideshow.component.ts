import { Component, Input, OnChanges } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits-response';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnChanges {

  @Input() cast: Cast[] = [];

  currentPage = 0;
  readonly itemsPerPage = 6;

  ngOnChanges(): void {
    this.currentPage = 0;
  }

  get visibleCast(): Cast[] {
    const start = this.currentPage * this.itemsPerPage;
    return this.cast.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.cast.length / this.itemsPerPage);
  }

  prev(): void {
    if (this.currentPage > 0) this.currentPage--;
  }

  next(): void {
    if (this.currentPage < this.totalPages - 1) this.currentPage++;
  }
}
