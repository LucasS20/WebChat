import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {SelectComponent} from "../../inputs/select/select.component";
import {GrupoPerguntaService} from "../../../services/grupoPerguntasService/grupo-pergunta.service";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {GrupoPerguntas} from "../../../models/grupo-perguntas";
import {InputComponent} from "../../inputs/input/input.component";
import {ButtonComponent} from "../../inputs/button/button.component";
@Component({
    selector: 'app-criar-sala',
    standalone: true,

    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        SelectComponent,
        MatCardTitle,
        MatCard,
        MatCardContent,
        MatCardActions,
        MatButton,
        HttpClientModule,
        MatLabel,
        InputComponent,
        ButtonComponent
    ],
    templateUrl: './criar-sala.component.html',
    styleUrl: './criar-sala.component.scss'
})
export class CriarSalaComponent implements OnInit {
    criarSalaForm: FormGroup;
    readonly urlHost = 'http://localhost:4200';
    gruposPerguntas: any[] = [];

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private service: GrupoPerguntaService
    ) {

        this.criarSalaForm = this.criarFormulario();
         this.service.getGruposPerguntasProfessorID('6b5a40fe-4fb0-464f-ba4d-a166212ce720').subscribe({
            next: (grupoPerguntas: GrupoPerguntas[]) => {
                this.gruposPerguntas = grupoPerguntas;
            }, error: (err) => {
                console.error(err)
            }
        });
    }

    criarFormulario() {
        return this.formBuilder.group({
            identificadorSala: ['', Validators.required]
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();
        this.gerarLink();
    }

    gerarLink() {
        if (this.criarSalaForm.valid) {
            const identificadorSala = this.criarSalaForm.value.identificadorSala;
            const linkSala = `${this.urlHost}/chat/${identificadorSala}/Professor`
            this.router.navigate(['chat', identificadorSala, 'Professor']);
        }
    }

    ngOnInit(): void {
        // this.options = [];
    }
}
