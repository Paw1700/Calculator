import { Component, OnDestroy } from "@angular/core";
import { CalculatorService } from "./calculator.service";

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnDestroy{
    constructor(private cS:CalculatorService) {}

    buttonClicked(move: string){
        this.cS.buttonClicked(move);
    }
    
    ngOnDestroy(): void {
        this.cS.resetCalculator();
    }
}