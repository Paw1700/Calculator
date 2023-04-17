import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'modes',
    templateUrl: './modes.component.html',
    styleUrls: ['./modes.component.scss']
})
export class ModesComponent{
    @Output() chLoc = new EventEmitter<string>();

    emitChLog(convType: string){
        this.chLoc.emit(convType);
        // window.location.reload();
    }
}