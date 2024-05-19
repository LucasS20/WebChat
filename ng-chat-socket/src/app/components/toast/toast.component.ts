import { Component } from '@angular/core';
import { PorscheDesignSystemModule } from "@porsche-design-system/components-angular";
import {AsyncPipe, NgIf} from "@angular/common";
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [
        PorscheDesignSystemModule,
        NgIf,
        AsyncPipe
    ],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss'
})
export class ToastComponent {
    constructor(private toastService: ToastService) {}

    get isVisible() {
        return this.toastService.visibility$;
    }
}
