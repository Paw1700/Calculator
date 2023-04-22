import { NgModule } from "@angular/core";
import { ModesComponent } from "./components/modes/modes.component";
import { RouterModule } from "@angular/router";
import { NumberKeyboardComponent } from "./components/keyboard/keyboard.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ModesComponent,
        NumberKeyboardComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
    ],
    exports: [
        ModesComponent,
        NumberKeyboardComponent,
    ]
})
export class SharedModule{

}