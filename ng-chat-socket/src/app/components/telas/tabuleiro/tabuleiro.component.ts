import {Component, OnInit} from '@angular/core';
import {FormComponent} from "../../form/form/form.component";
import {ActivatedRoute} from "@angular/router";
import {TabuleiroService} from "../../../services/tabuleiro.service";
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {ButtonComponent} from "../../inputs/button/button.component";

@Component({
    selector: 'app-tabuleiro',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgForOf,
        NgClass,
        ButtonComponent
    ],
    templateUrl: './tabuleiro.component.html',
    styleUrl: './tabuleiro.component.scss'
})
export class TabuleiroComponent extends FormComponent implements OnInit {
    private userID: any;
    private salaID: any;
    readonly numRows = 10;
    readonly numCols = 5;
    logoSrc = 'assets/logo_tis.png';

    constructor(public route: ActivatedRoute,
                public tabuleiroService: TabuleiroService) {
        super();
    }

    ngOnInit(): void {
        this.userID = this.route.snapshot.params['userID'];
        this.salaID = this.route.snapshot.params['salaID'];
        this.tabuleiroService.conectarAosSockets(this.salaID);
    }

    getNumber(row: number, col: number): string | number {
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

    onButtonClick() {

    }
}
