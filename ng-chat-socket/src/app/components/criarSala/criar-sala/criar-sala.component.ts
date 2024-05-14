import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-criar-sala',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput
  ],
  templateUrl: './criar-sala.component.html',
  styleUrl: './criar-sala.component.scss'
})
export class CriarSalaComponent {
  criarSalaForm: FormGroup;
  readonly urlHost = 'http://localhost:4200';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.criarSalaForm = this.criarFormulario();
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
}
