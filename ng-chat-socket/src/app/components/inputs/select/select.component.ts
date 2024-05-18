import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-select',
    standalone: true,
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        NgForOf,
        NgIf
    ],
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

    form: FormGroup;
    @Input() options: any;
    @Input() nomePropriedade!: string;

    constructor(public formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            selecionar: [null, Validators.required]
        });
    }

    ngOnInit(): void {
    }

    getControl(controlName: string): FormControl {
        return this.form.controls[controlName] as FormControl;
    }

}
