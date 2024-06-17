import {Component, OnInit} from '@angular/core';
import {FormComponent} from "../../form/form/form.component";
import {ActivatedRoute} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ButtonComponent} from "../../inputs/button/button.component";
import {JogoService} from "../../../services/jogoService/jogo.service";
import {MatButton} from "@angular/material/button";
import {Player} from "../../../models/Player";
import {Aluno} from "../../../models/Aluno";

@Component({
    selector: 'app-tabuleiro',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgForOf,
        NgClass,
        ButtonComponent,
        MatButton,
        NgIf,
        NgStyle
    ],
    templateUrl: './tabuleiro.component.html',
    styleUrl: './tabuleiro.component.scss'
})
export class TabuleiroComponent extends FormComponent implements OnInit {
    cells: number[] = Array(24).fill(0);
    private userID: any;
    private salaID: any;

    players: Player[] = [
        new Player(new Aluno(1, 'Alice'), 0, 'red'),
        new Player(new Aluno(2, 'Bob'), 5, 'blue'),
        new Player(new Aluno(3, 'Carol'), 5, 'green'),
        new Player(new Aluno(4, 'Dave'), 10, 'yellow'),
        new Player(new Aluno(5, 'Eve'), 15, 'purple'),
        new Player(new Aluno(6, 'Frank'), 5, 'orange')
    ];
    colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#A633FF', '#FFD733'];

    constructor(public route: ActivatedRoute,
                public jogoService: JogoService) {
        super();
    }

    ngOnInit(): void {
        this.userID = this.route.snapshot.params['userID'];
        this.salaID = this.route.snapshot.params['salaID'];
        this.jogoService.conectarAosSockets(this.salaID, this.salaID);
    }

    onButtonClick() {
        this.jogoService.sendSolicitacaoPergunta()
    }
}
