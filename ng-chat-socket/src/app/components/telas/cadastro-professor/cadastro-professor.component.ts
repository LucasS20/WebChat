import {Component} from "@angular/core";
import {ButtonComponent} from "../../inputs/button/button.component";
import {InputComponent} from "../../inputs/input/input.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {SelectComponent} from "../../inputs/select/select.component";
import {SpinnerComponent} from "../../spinner/spinner/spinner.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormComponent} from "../../form/form/form.component";
import {SpinnerService} from "../../../services/spinnerService/spinner.service";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-cadastro-professor',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    MatCard,
    MatCardContent,
    MatCardTitle,
    SelectComponent,
    SpinnerComponent,
    MatFormField,
    MatIcon,
    FormsModule,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-professor.component.html',
  styleUrl: './cadastro-professor.component.scss'
})
export class CadastroProfessorComponent extends FormComponent {
  hide: boolean = true;
  password: any = '';

  constructor(public spinnerService: SpinnerService,
              public userService: UserService,
              public toastrService: ToastrService) {
    spinnerService.show();
    super();
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, Validators.required],
      senha: [null, Validators.required]
    });
    spinnerService.hide();
  }

  onSubmit() {
    this.cadastrarProfessor();
  }

  private cadastrarProfessor() {
    this.spinnerService.show();
    this.userService.criarProfessor(this.form.value).subscribe({
      next: (retorno: any) => {
        this.toastrService.show("Usuário criado com sucesso", 'Redirecionando...')
        this.router.navigate(['login'])
        this.spinnerService.hide();
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.error.message, 'Ops!!')
        this.spinnerService.hide();
      }
    })
  }
}
