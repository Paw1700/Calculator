import { NgModule } from "@angular/core";
import { CalculatorModule } from "./calculator/calculator.module";
import { LengthConverterModule } from "./lengthConv/lengthConv.module";
import { RouterModule, Routes } from "@angular/router";
import { CalculatorComponent } from "./calculator/calculator.component";
import { LengthConverterComponent } from "./lengthConv/lengthConv.component";
import { TemperatureConverterModule } from "./tempConv/tempConv.module";
import { TemperatureConverterComponent } from "./tempConv/tempConv.component";
import { TimeConverterModule } from "./timeConv/timeConv.module";
import { TimeConverterComponent } from "./timeConv/timeConv.component";

const route: Routes = [
    { path: 'calculator', component: CalculatorComponent },
    { path: 'length', component: LengthConverterComponent },
    { path: 'temperature', component: TemperatureConverterComponent },
    { path: 'time', component: TimeConverterComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'calculator' }
]

@NgModule({
    imports: [
        CalculatorModule,
        LengthConverterModule,
        TemperatureConverterModule,
        TimeConverterModule,

        RouterModule.forRoot(route),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}