import { Component } from "@angular/core";
import { ConvertedItem } from "../shared/models/convertedItem.model";

@Component({
    selector: 'timeConv',
    templateUrl: './timeConv.component.html',
    styleUrls: ['./timeConv.component.scss']
})
export class TimeConverterComponent {
    public Units: ConvertedItem[] = [
        new ConvertedItem(true, 'Sekund', '0', 's'),
        new ConvertedItem(false, 'Minut', '0', 'min'),
        new ConvertedItem(false, 'Godzin', '0', 'h'),
        new ConvertedItem(false, 'Dni', '0', 'd'),
        new ConvertedItem(false, 'Tygodni', '0', 't'),
        new ConvertedItem(false, 'Miesięcy', '0', 'm'),
        new ConvertedItem(false, 'Lat', '0', 'lat'),
    ]
    private choosedUnitIndex: number = 0;
    private value: string = '';

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
            case 'return':
                this.value = this.value.substring(0, this.value.length - 1)
                break;
        }
        if (this.value === '') {
            this.value = '0';
        }
        this.convertRestOfUnits();
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
        let universalValue = 0; // UNIVERSAL VALUE IS SECONDS
        switch (this.choosedUnitIndex) {
            case 0: // SECONDS
                universalValue = +this.value;
                break;
            case 1: // MINUTES
                universalValue = +this.value * 60;
                break;
            case 2: // HOURS
                universalValue = +this.value * 60 * 60;
                break;
            case 3: // DAYS
                universalValue = +this.value * 60 * 60 * 24;
                break;
            case 4: // WEEKS
                universalValue = +this.value * 60 * 60 * 24 * 7;
                break;
            case 5: // MONTHS
                universalValue = +this.value * 60 * 60 * 24 * 31;
                break;
            case 6: // YEARS
                universalValue = +this.value * 60 * 60 * 24 * 365;
                break;
            default:
                console.error('Converting other values to universal value error !!!');
                break;
        }
        for (let unit of this.Units) {
            let convertedValue = 0;
            switch (unit.symbol) {
                case 's':
                    convertedValue = universalValue;
                    break;
                case 'min':
                    convertedValue = universalValue / 60;
                    break;
                case 'h':
                    convertedValue = universalValue / 60 / 60;
                    break;
                case 'd':
                    convertedValue = universalValue / 60 / 60 / 24;
                    break;
                case 't':
                    convertedValue = universalValue / 60 / 60 / 24 / 7;
                    break;
                case 'm':
                    convertedValue = universalValue / 60 / 60 / 24 / 31;
                    break;
                case 'lat':
                    convertedValue = universalValue / 60 / 60 / 24 / 365;
                    break;
                default:
                    console.error('Converting universal value to other values error !!!');
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