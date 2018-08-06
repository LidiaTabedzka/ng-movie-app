import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number;
  @Input() elementsPerPage: number;
  @Input() totalElementsCount: number;
  @Output() calculatedPagesRange = new EventEmitter<Array<number>>();
  @Output() currentPageHandler = new EventEmitter<number>();

  pagesRange: Array<number>;

  pageChangeHandler(page: number) {
    this.currentPageHandler.emit(page);
  }

  pagesRangeCreator(perPage: number, totalElements: number) {
    const pagesRange: Array<number> = [];
    for (let i = 1; i <= Math.ceil(totalElements / perPage); i++) {
      pagesRange.push(i);
    }
    this.pagesRange = pagesRange;
    this.calculatedPagesRange.emit(pagesRange);
  }

  ngOnChanges() {
    this.pagesRangeCreator(this.elementsPerPage, this.totalElementsCount);
  }
}
