import {Component, Input} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {FormComponent} from "../../form/form/form.component";

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss'
})
export class InputComponent extends FormComponent{

    @Input() nomeCampo!: string;
    @Input() control!: FormControl;
    getErrorMessage() {
        if (this.control.hasError('required')) {
            return 'Você deve preencher este campo.';
        }
        return null;
    }
}
