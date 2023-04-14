import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConvertedItem } from "../../models/convertedItem.model";

@Component({
    selector: 'convertedItem',
    templateUrl: './convertedItem.component.html',
    styleUrls: ['./convertedItem.component.css']
})
export class ConvertedItemComponent{
    @Input() item: ConvertedItem = new ConvertedItem(false, '', '', '');
    @Input() index: number = 0;
    @Output() itemChoosed = new EventEmitter<number>();

    choose(){
        this.itemChoosed.emit(this.index);
    }
}