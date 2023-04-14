import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LengthConverterComponent } from "./lengthConv.component";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        LengthConverterComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class LengthConverterModule{

}