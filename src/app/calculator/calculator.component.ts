import { Component } from "@angular/core";

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
    public displayedEq = '0';

    private moveTable: string[] = [];

    private result = 0;

    private newTypedNumber = true;
    private gottenResult = false;
    private openBracket = false;
    private addMultiplyAfterBracket = false;

    private newTypedNumberBlockingStrings = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'comma'
    ]

    public buttonClicked(move: string) {
        switch (move) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                if (this.gottenResult) { //RESET CALCULATOR IF CLICKED NUMBER AND GOTTEN RESULTS BEFORE
                    this.resetCalculator();
                    this.gottenResult = false;
                }
                if (this.addMultiplyAfterBracket) {
                    this.moveTable.push('*');
                    this.addMultiplyAfterBracket = false;
                }
                if (this.newTypedNumber) { //ADDING NEW NUMBER TO MOVE TABLE
                    this.moveTable.push(move);
                    this.newTypedNumber = false;
                } else { //ADDING ONE NUMBER TO PREVIOUS
                    this.moveTable[this.moveTable.length - 1] += move;
                }
                break;
            case 'comma':
                if (this.moveTableNotEmpty()) {
                    if (!this.moveTable[this.moveTable.length - 1].includes('.')) {
                        this.moveTable[this.moveTable.length - 1] += '.';

                    }
                } else {
                    this.moveTable.push('0.');
                }
                break;
            case 'bracketLeft':
                if (this.moveTableNotEmpty() && !this.openBracket) {
                    let lastMoveInTable = this.moveTable[this.moveTable.length - 1];
                    if (lastMoveInTable === '+' || lastMoveInTable === '-' || lastMoveInTable === '*' || lastMoveInTable === '/') {
                        this.moveTable.push('(');
                    } else {
                        this.moveTable.push('*');
                        this.moveTable.push('(');
                    }
                    this.openBracket = true;
                }
                break;
            case 'bracketRight':
                if (this.openBracket) {
                    let lastMoveInTable = this.moveTable[this.moveTable.length - 1];
                    if (lastMoveInTable === '+' || lastMoveInTable === '-' || lastMoveInTable === '*' || lastMoveInTable === '/') {
                        this.moveTable.pop();
                        this.moveTable.push(')');
                    } else {
                        this.moveTable.push(')');
                    }
                    this.openBracket = false;
                    this.addMultiplyAfterBracket = true;
                }
                break;
            case 'result':
                if (!this.gottenResult) {
                    this.result = eval(this.convertToEquation(this.moveTable));
                    // this.screen.next(this.result.toString());
                } else {
                    let tempMoveTable: string[] = [this.result.toString()];

                    tempMoveTable.push(this.moveTable[this.moveTable.length - 2]);
                    tempMoveTable.push(this.moveTable[this.moveTable.length - 1]);

                    this.result = eval(this.convertToEquation(tempMoveTable));
                    // this.screen.next(this.result.toString());
                }
                this.gottenResult = true;
                break;
            case 'return':
                if (this.gottenResult) {
                    this.resetCalculator();
                } else {
                    if (this.moveTable.length !== 0) {
                        let move = this.moveTable[this.moveTable.length - 1];
                        if (move.length > 1) {
                            move = move.substring(0, move.length - 1);
                            this.moveTable[this.moveTable.length - 1] = move;
                        } else if (move.length === 1) {
                            if (move === '(') {
                                this.openBracket = false;
                            } else if (move === ')') {
                                this.openBracket = true;
                                this.addMultiplyAfterBracket = false;
                            }
                            this.moveTable.pop();
                        }
                        else {
                            this.moveTable.pop();
                        }
                    } else {
                        // this.screen.next('0');
                    }
                }
                break;
            case 'AC':
                this.resetCalculator();
                break;
            //
            //
            //* MATH BASIC OPERATIONS
            //
            //
            case 'plus':
            case 'minus':
            case 'times':
            case 'divide':
                if (this.moveTableNotEmptyAndLastMoveIsANumber()) {
                    this.moveTable.push(this.addOperation(move));
                    this.addMultiplyAfterBracket = false;
                }
                break;
            case 'percent':
                if (this.moveTableNotEmptyAndLastMoveIsANumber()) {
                    this.moveTable[this.moveTable.length - 1] = (+this.moveTable[this.moveTable.length - 1] / 100).toString();
                }
                break;
            case 'plusMinus':
                if (this.moveTableNotEmptyAndLastMoveIsANumber()) {
                    this.moveTable[this.moveTable.length - 1] = (+this.moveTable[this.moveTable.length - 1] * -1).toString();
                }
                break;
        }
        if (move !== 'result') { // RESULT SENT VALUE TO SCREEN BY HIMSELF
            // this.screen.next(this.moveTable.join(','));
            this.displayedEq = this.convertToEquation(this.moveTable);
        }

    }

    private resetCalculator() { // USED IN AC AND AFTER EXITING CALCULATOR
        this.newTypedNumber = true;
        this.gottenResult = true;
        this.openBracket = false;
        this.addMultiplyAfterBracket = false;
        // this.screen.next('0');
        this.moveTable = [];
        this.result = 0;
    }

    private moveTableNotEmpty(): boolean {
        return this.moveTable.length > 0 ? true : false;
    }

    private moveTableNotEmptyAndLastMoveIsANumber(): boolean {
        return this.moveTable.length > 0 && !Number.isNaN(+this.moveTable[this.moveTable.length - 1]) ? true : false
    }

    private addOperation(operationType: string): string {
        switch (operationType) {
            case 'plus':
                return '+';
            case 'minus':
                return '-';
            case 'times':
                return '*';
            case 'divide':
                return '/';
            default:
                return '';
        }
    }

    private convertToEquation(table: string[]): string { // USED FOR TRANSFOMRING MOVE TABLE TO STRING FOR JS TO CALCULATE RESULT
        return table.join('');
    }
}