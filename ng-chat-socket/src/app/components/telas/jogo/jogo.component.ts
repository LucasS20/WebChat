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
import {Subscription} from "rxjs";
import {Pergunta} from "../../../models/pergunta";
import {MatToolbar} from "@angular/material/toolbar";
import {SpinnerService} from "../../../services/spinnerService/spinner.service";
import {Aluno} from "../../../models/Aluno";
import {Dto} from "../../../models/dto";
import {MessageType} from "../../../models/MessageType";

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


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.salaID = params['salaID'];
            this.userID = params['userID'];
        })

        this.jogoService.conectarAosSockets(this.salaID, this.userID).then(() => {

            this.subscription.add(this.jogoService.perguntaAtual.subscribe(pergunta => {
                this.spinner.show();
                const dto = JSON.parse(pergunta)
                this.pergunta = dto.pergunta;
                this.spinner.hide();
            }));

        }).catch(error => {
            console.error("Erro ao estabelecer conexão WebSocket:", error);
        })
    }

    responder(resposta: Resposta) {
        const aluno: Aluno = {
            id: null,
            nome: this.userID
        }
        const respostaAluno = {
            aluno: aluno, pergunta: this.pergunta,
            resposta: resposta
        };

        const dto: Dto = {
            salaID: this.salaID,
            aluno: aluno,
            chatMessage: null,
            pergunta: null,
            resposta: respostaAluno,
            verificaResposta: null,
            type: MessageType.respostaAluno
        }
      console.log(dto);

      this.jogoService.responder(dto)
    }
}
