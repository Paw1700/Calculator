import { Component } from "@angular/core";
import { CalculatorService } from "../calculator.service";

@Component({
    selector: 'operations',
    templateUrl: './operations.component.html',
    styleUrls: ['./operations.component.css']
})
export class OperationsComponent{
    constructor(public cS: CalculatorService) { }
}