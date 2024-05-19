import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {async} from "rxjs";
import {SpinnerService} from "./spinner.service";

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [
        NgIf,
        MatProgressSpinner,
        AsyncPipe
    ],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
    isVisible = this.spinnerService.isVisible;

    constructor(public spinnerService: SpinnerService) {
    }
}
