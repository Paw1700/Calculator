import { NgModule } from "@angular/core";
import { ModesComponent } from "./components/modes/modes.component";
import { RouterModule } from "@angular/router";
import { NumberKeyboardComponent } from "./components/keyboard/keyboard.component";
import { ConvertedItemComponent } from "./components/convertedItem/convertedItem.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ModesComponent,
        NumberKeyboardComponent,
        ConvertedItemComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
    ],
    exports: [
        ModesComponent,
        NumberKeyboardComponent,
        ConvertedItemComponent,
    ]
})
export class SharedModule{

}