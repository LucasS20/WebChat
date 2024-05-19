import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule, Validators} from "@angular/forms";
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
import {FormComponent} from "../../form/form/form.component";
import {JogoService} from "../../../services/jogoService/jogo.service";
import {CreateSala} from "../../../models/create-sala";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SpinnerComponent} from "../../spinner/spinner/spinner.component";
import {SpinnerService} from "../../../services/spinnerService/spinner.service";
import {ToastrService} from "ngx-toastr";

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
    ButtonComponent,
    MatProgressSpinner,
    SpinnerComponent,
  ],
  templateUrl: './criar-sala.component.html',
  styleUrl: './criar-sala.component.scss'
})
export class CriarSalaComponent extends FormComponent implements OnInit {
  readonly URL_HOST = 'http://localhost:4200';
  gruposPerguntas: GrupoPerguntas[] = [];
  private readonly PROFESSOR_ID: string = 'a5d07b8a-cc61-4a9d-9789-301a93f3ad9d';

  constructor(private grupoPerguntaService: GrupoPerguntaService,
              private jogoService: JogoService,
              private spinnerService: SpinnerService,
              private toastr: ToastrService
  ) {

    super();
    this.form = this.formBuilder.group({
      id: [null, Validators.required],
      grupoPerguntasID: [null, Validators.required],
      userID: [this.PROFESSOR_ID]
    });
  }

  ngOnInit(): void {
    this.spinnerService.show()
    this.getGrupoPerguntasID();
  }


  private getGrupoPerguntasID() {
    this.grupoPerguntaService.getGruposPerguntasProfessorID(this.PROFESSOR_ID).subscribe({
      next: (grupoPerguntas: GrupoPerguntas[]) => {
        this.gruposPerguntas = grupoPerguntas;
        this.spinnerService.hide();

      }, error: (err) => {
        console.error(err)
      }
    });

  }


  redirecionarSalaEspera() {
    const idSala = this.form.value.id;
    const linkSala = `${this.URL_HOST}/chat/${idSala}/${(this.PROFESSOR_ID)}`
    console.log(this.router.navigate(['chat', idSala, this.PROFESSOR_ID]));
  }

  onSubmit() {
    const formData = this.form?.value;
    this.criarSala(formData);

  }

  private criarSala(formData: CreateSala) {
    this.spinnerService.show();
    this.jogoService.criarSala(formData).subscribe({
      next: () => {
        this.spinnerService.hide();
        this.toastr.show('Sala Criada com sucesso', 'Ok')
        this.redirecionarSalaEspera();
      },
      error: (err) => {
        this.toastr.info(err.error.message, 'Ops!!')
        this.spinnerService.hide();
      }
    })
  }

}
