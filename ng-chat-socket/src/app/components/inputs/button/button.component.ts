import {Component, EventEmitter, Input, Output} from '@angular/core';
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
    @Output() buttonClick = new EventEmitter<void>();
    @Input() texto!: any;

    internalClick() {
        this.buttonClick.emit();
    }
}
