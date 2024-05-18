import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [
        MatButton,
        MatIcon
    ],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input() texto!: any;

}
