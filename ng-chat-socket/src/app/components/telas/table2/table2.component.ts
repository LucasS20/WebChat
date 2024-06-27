import { Component } from '@angular/core';
import {NgClass, NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-table2',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    NgForOf
  ],
  templateUrl: './table2.component.html',
  styleUrl: './table2.component.scss'
})
export class Table2Component {
  numRows: number = 5;
  numCols: number = 10;

  getNumber(row: number, col: number): number | string {
    if (row === 0) {
      return 1 + col;
    } else if (col === this.numCols - 1 && row < this.numRows - 1) {
      return 10 + row;
    } else if (row === this.numRows - 1 && col > 0) {
      return 14 + (this.numCols - col - 1);
    } else if (col === 0 && row > 0) {
      return 24 + (this.numRows - row - 2);
    }
    return '';
  }
}
