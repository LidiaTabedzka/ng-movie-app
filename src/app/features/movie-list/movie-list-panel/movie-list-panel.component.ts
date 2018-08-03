import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-list-panel',
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
  @Output() displayChanged = new EventEmitter<string>();

  favouritesFilterHandle(filterChecked: boolean) {
    this.favouritesFilterHandler.emit(filterChecked);
  }

  clearListHandler() {
    this.clearList.emit();
  }

  sortingHandle(selectedSortValue: string) {
    this.sortingHandler.emit(selectedSortValue);
  }

  perPageHandle(perPage: number) {
    this.perPageHandler.emit(perPage);
  }

  onDisplayChanged(displayOption: string) {
    this.displayChanged.emit(displayOption);
  }
}
