import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ConverterComponent } from "./converter.component";
import { RouterModule, Routes } from "@angular/router";

const route: Routes = [
    {path: ':conversionType', component: ConverterComponent},
]

@NgModule({
    declarations:[
        ConverterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(route)
    ],
})
export class ConverterModule{

}