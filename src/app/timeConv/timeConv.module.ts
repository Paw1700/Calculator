import { NgModule } from "@angular/core";
import { TimeConverterComponent } from "./timeConv.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        TimeConverterComponent
    ], 
    imports: [
        CommonModule,
        SharedModule,
    ]
})
export class TimeConverterModule{

}