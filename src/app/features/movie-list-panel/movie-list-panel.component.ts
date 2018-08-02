import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'movie-list-panel',
  templateUrl: './movie-list-panel.component.html',
  styleUrls: ['./movie-list-panel.component.css']
})
export class MovieListPanelComponent {
  @Input() sortingOptions: Array<any>;
  @Input() defaultSortingOption: string;
  @Input() paginationOptions: Array<number>;
  @Input() displayOptions: Array<string>;
  @Output() clearList = new EventEmitter<boolean>();
  @Output() favouritesFilterHandler = new EventEmitter<any>();
  @Output() sortingHandler = new EventEmitter<string>();
  @Output() perPageHandler = new EventEmitter<number>();
  @Output() displayHandler = new EventEmitter<string>();

  favouritesFilterHandle(filterChecked: boolean): void {
    this.favouritesFilterHandler.emit(filterChecked);
  }

  clearListHandler(): void {
    this.clearList.emit();
  }

  sortingHandle(selectedSortValue: string): void {
    this.sortingHandler.emit(selectedSortValue);
  }

  perPageHandle(perPage: number): void {
    this.perPageHandler.emit(perPage);
  }

  displayHandle(displayOption: string): void {
    this.displayHandler.emit(displayOption);
  }
}
