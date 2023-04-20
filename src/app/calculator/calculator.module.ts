import { NgModule } from "@angular/core";
import { CalculatorComponent } from "./calculator.component";
import { CommonModule } from "@angular/common";
import { OperationsComponent } from "./operations/operations.component";
import { SharedModule } from "../shared/shared.module";
import { EquationComponent } from "./equation/equation.component";

@NgModule({
    declarations: [
        CalculatorComponent,
        OperationsComponent,
        EquationComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
    ]
})
export class CalculatorModule{

}