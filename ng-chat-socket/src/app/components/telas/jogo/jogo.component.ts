import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {ButtonComponent} from "../../inputs/button/button.component";
import {InputComponent} from "../../inputs/input/input.component";
import {SelectComponent} from "../../inputs/select/select.component";
import {SpinnerComponent} from "../../spinner/spinner/spinner.component";
import {FormComponent} from "../../form/form/form.component";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";
import {Resposta} from "../../../models/resposta";
import {JogoService} from "../../../services/jogoService/jogo.service";
import {interval, Subscription} from "rxjs";
import {Pergunta} from "../../../models/pergunta";
import {MatToolbar} from "@angular/material/toolbar";
import {SpinnerService} from "../../../services/spinnerService/spinner.service";

@Component({
    selector: 'app-jogo',
    standalone: true,
    imports: [
        MatCard,
        ButtonComponent,
        InputComponent,
        MatCardContent,
        MatCardTitle,
        SelectComponent,
        SpinnerComponent,
        NgForOf,
        MatToolbar
    ],
    templateUrl: './jogo.component.html',
    styleUrl: './jogo.component.scss'
})
export class JogoComponent extends FormComponent implements OnInit {

    private subscription: Subscription = new Subscription();
    salaID: string = "Identificador da Sala";
    userID: string = 'Esqueceu do nome do cara ai vacilão';
    pergunta: Pergunta = {} as Pergunta;

    constructor(private route: ActivatedRoute,
                private jogoService: JogoService,
                private spinner: SpinnerService) {
        super();
        this.configurarParametroURL();
    }


    private configurarParametroURL() {
        this.route.params.subscribe(params => {
            this.salaID = params['salaID'];
            this.userID = params['userID'];
        });
    }

    onSubmit() {
        console.log('a')
    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.salaID = params['salaID'];
            this.userID = params['userID'];
        })

        this.jogoService.conectarAosSockets(this.salaID).then(() => {
            this.jogoService.solicitarPergunta(this.salaID);

            this.subscription.add(this.jogoService.perguntaAtual.subscribe(pergunta => {
                this.spinner.show();
                this.pergunta = JSON.parse(pergunta);
                setTimeout(() => {
                    this.spinner.hide();
                }, 1000);

            }));

            this.subscription.add(interval(10000).subscribe(x => {
                this.jogoService.solicitarPergunta(this.salaID);
            }));
        }).catch(error => {
            console.error("Erro ao estabelecer conexão WebSocket:", error);
        })
    }
}
