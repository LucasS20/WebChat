import {Component} from '@angular/core';
import {ButtonComponent} from "../../inputs/button/button.component";
import {InputComponent} from "../../inputs/input/input.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {SpinnerComponent} from "../../spinner/spinner/spinner.component";
import {FormComponent} from "../../form/form/form.component";
import {SpinnerService} from "../../../services/spinnerService/spinner.service";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    SpinnerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends FormComponent {
  hide: any;

  constructor(public spinnerService: SpinnerService,
              public userService: UserService,
              public toastrService: ToastrService) {
    super();
    spinnerService.show();
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      senha: [null, Validators.required]
    });
    spinnerService.hide();
  }

  onSubmit() {

    this.userService.login(this.form.value).subscribe({
      next: (res) => {
        this.toastrService.show(res.message, 'Sucesso')
      }, error: () => {
        this.toastrService.error('Erro no login, tente novamente', 'Ops');
      }
    });
  }


}
