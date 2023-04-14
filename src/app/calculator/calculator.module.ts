import { NgModule } from "@angular/core";
import { CalculatorComponent } from "./calculator.component";
import { CommonModule } from "@angular/common";
import { OperationsComponent } from "./operations/operations.component";
import { SharedModule } from "../shared/shared.module";
import { EquationComponent } from "./equation/equation.component";
import { CalculatorService } from "./calculator.service";

@NgModule({
    declarations: [
        CalculatorComponent,
        OperationsComponent,
        EquationComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [
        
    ],
    providers: [
        CalculatorService
    ]
})
export class CalculatorModule{

}