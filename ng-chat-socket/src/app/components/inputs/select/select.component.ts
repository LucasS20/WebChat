import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormComponent} from "../../form/form/form.component";
import {Router} from "@angular/router";

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
export class SelectComponent extends FormComponent implements OnInit {

    @Input() options: any;
    @Input() nomePropriedade!: string;
    @Input() campoParaMostrar!: string;
    @Input() control!: FormControl;
    @Input() campoRetorno!: string;
    constructor() {
        super();
        this.form = this.formBuilder.group({
            selecionar: [null, Validators.required]
        });
    }

    ngOnInit(): void {
    }

}
