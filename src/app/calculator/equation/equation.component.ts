import { Component, OnDestroy } from "@angular/core";
import { CalculatorService } from "../calculator.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'equation',
    templateUrl: './equation.component.html',
    styleUrls: ['./equation.component.scss'],
})
export class EquationComponent implements OnDestroy {
    displayedNumber: string = '';

    dNS = new Subscription();

    constructor(private cS: CalculatorService) {
        this.dNS = this.cS.screen.subscribe(
            value => {
                let moveTable = value.split(',');
                let equation = '';
                for (let move of moveTable) {
                    switch (move) {
                        case '+':
                        case '-':
                        case '/':
                            equation = equation + ' ' + move + ' ';
                            break;
                        case '*':
                            equation = equation + ' × ';
                            break;
                        default:
                            equation += move;
                            break;
                    }
                }
                if (moveTable.length === 1 && moveTable[0] === '') {
                    this.displayedNumber = '0';
                } else {
                    this.displayedNumber = equation;
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.dNS.unsubscribe();
    }
}