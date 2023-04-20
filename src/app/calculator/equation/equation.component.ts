import { Component, Input } from "@angular/core";

@Component({
    selector: 'equation',
    templateUrl: './equation.component.html',
    styleUrls: ['./equation.component.scss'],
})
export class EquationComponent {
    @Input() displayedEq: string = '';
}