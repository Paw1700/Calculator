import { Component } from "@angular/core";
import { ConvertedItem } from "../shared/models/convertedItem.model";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'tempConv',
    templateUrl: './tempConv.component.html',
    styleUrls: ['./tempConv.component.css'],
    animations: [
        trigger('warnTemp', [
            transition("void => *", [
                style({
                    opacity: 0,
                    height: '0'
                }),
                animate('250ms ease-in', style({
                    opacity: 1,
                    height: '5vh'
                }))
            ]),
            transition("* => void", [
                animate('250ms ease-out' ,style({
                    opacity: 0,
                    height: '0'
                }))
            ])
        ])
    ]
})
export class TemperatureConverterComponent {
    Units: ConvertedItem[] = [
        new ConvertedItem(true, 'Celcjusz', '0', 'C'),
        new ConvertedItem(false, 'Faranhaiet', '32', 'F'),
        new ConvertedItem(false, 'Kelwin', '237.15', 'K')
    ]
    private choosedUnitIndex: number = 0;
    private value: string = '';
    public unpossibleTemp = false;

    buttonClicked(move: string) {
        if (this.value === '0') {
            this.value = '';
        }
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
                this.value += move;
                break;
            case 'comma':
                if (!this.value.includes('.')) {
                    if (this.value === '') {
                        this.value = '0'
                    }
                    this.value += '.'
                }
                break;
            case 'plusMinus':
                if (this.value !== '' && this.choosedUnitIndex !== 2) {
                    this.value = (+this.value * -1).toString();
                }
                break;
            case 'return':
                this.value = this.value.substring(0, this.value.length - 1)
                break;
        }
        if (this.value === '') {
            this.value = '0';
        }
        this.convertRestOfUnits();
        if (+this.Units[2].value < 0) {
            this.unpossibleTemp = true;
        } else {
            this.unpossibleTemp = false;
        }
    }


    unitChoosed(index: number) {
        let oldIndex = this.Units.findIndex(object => { //FIND OLD ACTIVE UNIT
            return object.active === true
        })
        this.Units[oldIndex].active = false; // SET ACTIVE TO FALSE FOR OLD UNIT
        this.choosedUnitIndex = index;
        this.Units[this.choosedUnitIndex].active = true; // SET ACTIVE TO FALSE FOR NEW UNIT
        this.value = ''; // AFTER CHOOSING NEW UNIT RESET VALUE
    }

    convertRestOfUnits() {
        let universalValue = 0;
        switch (this.choosedUnitIndex) {
            case 0: // C
                universalValue = +this.value + 273.15;
                break;
            case 1: // F
                universalValue = ((+this.value - 32) * 5 / 9) + 273.15;
                break;
            case 2: // Kelwins (UNIVERSAL VALUE)
                universalValue = +this.value;
                break;
        }
        for (let unit of this.Units) {
            let convertedValue = 0;
            switch (unit.symbol) {
                case 'C':
                    convertedValue = universalValue - 273.15;
                    break;
                case 'F':
                    convertedValue = (universalValue - 273.15) * 9 / 5 + 32;
                    break;
                case 'K':
                    convertedValue = universalValue;
                    break;
            }
            let precision = 2;
            let beforeComma = convertedValue.toString().split('.')[0];
            let afterComma = convertedValue.toString().split('.')[1];
            if (afterComma !== undefined) {
                afterComma = afterComma.substring(0, 2);
                let afterCommaTable = Array.from(afterComma);
                let firstZero = false;
                let secondZero = false;
                for (let oneNum of afterCommaTable) {
                    if (oneNum === '0') {
                        if (firstZero) {
                            secondZero = true;
                            break;
                        }
                        firstZero = true;
                    }
                }
                if (firstZero) {
                    if (!secondZero) {
                        precision = 0;
                    } else {
                        precision = 1;
                    }
                }
            }

            if (afterComma !== undefined && precision !== 0) {
                unit.value = beforeComma + "." + afterComma.substring(0, precision)
            } else {
                unit.value = beforeComma;
            }
            if (unit.active === true) {
                unit.value = this.value;
            }
        }

    }
}