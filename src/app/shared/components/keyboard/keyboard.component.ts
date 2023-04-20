import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'numKeyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss']
})
export class NumberKeyboardComponent{
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