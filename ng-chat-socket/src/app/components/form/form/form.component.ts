import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent {
    form: FormGroup;
    protected formBuilder: FormBuilder;
    protected router: Router;
    constructor() {
        this.formBuilder = new FormBuilder();
        this.form = this.formBuilder.group({});
        this.router = new Router();
    }

    getControl(controlName: string): FormControl {
        return this.form.controls[controlName] as FormControl;
    }
}
