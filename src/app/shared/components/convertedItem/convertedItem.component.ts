import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConvertedItem } from "../../models/convertedItem.model";

@Component({
    selector: 'convertedItem',
    templateUrl: './convertedItem.component.html',
    styleUrls: ['./convertedItem.component.scss']
})
export class ConvertedItemComponent {
    @Input() item: ConvertedItem = new ConvertedItem(false, false, 0, false, 0, '', '', 0);
}