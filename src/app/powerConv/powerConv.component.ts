import { Component } from "@angular/core";
import { ConvertedItem } from "../shared/models/convertedItem.model";

@Component({
    selector: 'powerConv',
    templateUrl: './powerConv.component.html',
    styleUrls: ['./powerConv.component.scss']
})
export class PowerConverterComponent{
    Units: ConvertedItem[] = [

    ]

    buttonClicked(move: string){
        
    }
}