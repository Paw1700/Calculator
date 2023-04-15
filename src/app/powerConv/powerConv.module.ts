import { NgModule } from "@angular/core";
import { PowerConverterComponent } from "./powerConv.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        PowerConverterComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class PowerConverterModule{

}