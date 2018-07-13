import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pagesRange: Array<number>;
  @Input() currentPage: number;
  @Output() currentPageHandler = new EventEmitter<number>();

  pageChangeHandler(page : number) {
    this.currentPageHandler.emit(page);
  }

  constructor() { }

  ngOnInit() {
  }

}
