import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'operations',
    templateUrl: './operations.component.html',
    styleUrls: ['./operations.component.scss']
})
export class OperationsComponent{
    @Output() btnClicked = new EventEmitter<string>();

    buttonClicked(move: string): void{
        this.btnClicked.emit(move);
    }
}