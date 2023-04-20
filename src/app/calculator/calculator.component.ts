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
                } else if(this.moveTable[this.moveTable.length - 2] !== undefined) {
                    let tempMoveTable: string[] = [this.result.toString()];
                    
                    tempMoveTable.push(this.moveTable[this.moveTable.length - 2]);
                    tempMoveTable.push(this.moveTable[this.moveTable.length - 1]);
                    
                    this.result = eval(this.convertToEquation(tempMoveTable));
                }
                this.displayedEq = this.result.toString();
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
            //
            //
            //* ADVANDED MATH
            //
            //
            case 'powerOf2':
                if (this.moveTableNotEmptyAndLastMoveIsANumber()) {
                    this.moveTable[this.moveTable.length - 1] = (Math.pow(+this.moveTable[this.moveTable.length - 1], 2)).toString();
                }
                break;
            case 'powerOf3':
                if (this.moveTableNotEmptyAndLastMoveIsANumber()) {
                    this.moveTable[this.moveTable.length - 1] = (Math.pow(+this.moveTable[this.moveTable.length - 1], 3)).toString();
                }
                break;
            case 'sqrt':
                if (this.moveTableNotEmptyAndLastMoveIsANumber()) {
                    this.moveTable[this.moveTable.length - 1] = (Math.sqrt(+this.moveTable[this.moveTable.length - 1])).toString();
                }
                break;
            case 'cbrt':
                if (this.moveTableNotEmptyAndLastMoveIsANumber()) {
                    this.moveTable[this.moveTable.length - 1] = (Math.cbrt(+this.moveTable[this.moveTable.length - 1])).toString();
                }
                break;
            case 'factorial':
                if (this.moveTableNotEmptyAndLastMoveIsANumber()) {
                    let tempMoveTable: string[] = [];
                    let lastMoveInTable = this.moveTable[this.moveTable.length - 1];
                    if (lastMoveInTable === '0') {
                        this.moveTable[this.moveTable.length - 1] = '1';
                    } else {
                        for (let i = 1; i <= +lastMoveInTable; i++) {
                            if (i !== 1) {
                                tempMoveTable.push(" * ");
                            }
                            tempMoveTable.push(i.toString());
                        }
                        this.moveTable[this.moveTable.length - 1] = eval(this.convertToEquation(tempMoveTable)).toString();
                    }
                }
                break;
            case 'divide1Of':
                if (this.moveTableNotEmptyAndLastMoveIsANumber()) {
                    let lastMoveInTable = this.moveTable[this.moveTable.length - 1];
                    this.moveTable[this.moveTable.length - 1] = (1 / +lastMoveInTable).toString();
                }
                break;
            default:
                break;
        }
        for (let st of this.newTypedNumberBlockingStrings) { //CHECKING IF MOVE SHOULD SET NEW NUMBER IN MOVE TABLE
            if (st === move) {
                this.newTypedNumber = false;
                break;
            } else {
                this.newTypedNumber = true;
            }
        }
        if (move !== 'result') { // RESULT SENT VALUE TO SCREEN BY HIMSELF
            if(!this.moveTableNotEmpty()){
                this.displayedEq = '0';
            } else {
                this.displayedEq = this.convertToDisplayedEq(this.moveTable);
            }
        }

    }

    private resetCalculator() { // USED IN AC AND AFTER EXITING CALCULATOR
        this.newTypedNumber = true;
        this.gottenResult = true;
        this.openBracket = false;
        this.addMultiplyAfterBracket = false;
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

    private convertToDisplayedEq(table: string[]): string{
        let eq = '';
        for(let move of table){
            switch(move){
                case '+':
                case '-':
                case '/':
                    eq = eq + ' ' + move + ' ';
                    break;
                case '*':
                    eq = eq + ' × ';
                    break;
                default: 
                    eq += move;
                    break;
            }
        }
        return eq;
    }
}