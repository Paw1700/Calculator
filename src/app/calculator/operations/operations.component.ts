import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'operations',
    templateUrl: './operations.component.html',
    styleUrls: ['./operations.component.scss']
})
export class OperationsComponent{
    @Output() btnClicked = new EventEmitter<string>();

    keyClicked: string | null = null;

    buttonClicked(move: string): void{
        this.keyClicked = move;
        this.btnClicked.emit(move);
        setTimeout(() => {
            this.keyClicked = null;
        },100);
    }
}