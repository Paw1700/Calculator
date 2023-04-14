import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'numKeyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.css']
})
export class NumberKeyboardComponent{
    @Output() btnClicked = new EventEmitter<string>();

    buttonClicked(move: string): void{
        this.btnClicked.emit(move);
    }
}