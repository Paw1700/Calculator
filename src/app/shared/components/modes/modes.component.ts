import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'modes',
    templateUrl: './modes.component.html',
    styleUrls: ['./modes.component.scss']
})
export class ModesComponent{
    @Output() convType = new EventEmitter<string>();

    chConvType(convType: string){
        this.convType.emit(convType);
    }
}