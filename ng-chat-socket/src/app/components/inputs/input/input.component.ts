import {Component, Input} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-input',
  standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel
    ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

    @Input() nomeCampo!:string;

}
