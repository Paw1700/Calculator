import { Component } from "@angular/core";
import { ConvertedItem } from "../shared/models/convertedItem.model";

@Component({
    selector: 'lengthConv',
    templateUrl: './lengthConv.component.html',
    styleUrls: ['./lengthConv.component.css']
})
export class LengthConverterComponent {
    Units: ConvertedItem[] = [
        new ConvertedItem(true, 'Mil', '0', 'mil'),
        new ConvertedItem(false, 'Mil morskich', '0', 'nmil'),
        new ConvertedItem(false, 'Jardów', '0', 'yd'),
        new ConvertedItem(false, 'Stóp', '0', 'ft'),
        new ConvertedItem(false, 'Kilometry', '0', 'km'),
        new ConvertedItem(false, 'Metry', '0', 'm'),
        new ConvertedItem(false, 'Centymetry', '0', 'cm'),
        new ConvertedItem(false, 'Minimetry', '0', 'mm'),
        new ConvertedItem(false, 'Cale', '0', 'cal'),
    ]
    private choosedUnitIndex: number = 0;
    private value: string = '';

    buttonClicked(move: string) { //ADDING NUMBER TO UNIVERSALVALUE
        if (this.value === '0') {// SETTING EMPTY VALUE FOR START
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
                if (!this.value.includes('.')) {// DON'T ADD COMMA IF VALUE HAS IT
                    if (this.value === '') { // IF VALUE DON'T HAVE ANY NUMBER ADD 0 AT START
                        this.value = '0';
                    }
                    this.value += '.' //ADD COMMA
                }
                break;
            case 'return':
                this.value = this.value.substring(0, this.value.length - 1); // REMOVE ONE LETTER FROM RIGHT SITE
                // if (this.value === '') { //IF WE EMPTY STRING GIVE 1 ZERO
                //     this.value = '0';
                // }
                break;
        }
        if (this.value === '') { // RETURN ZERO
            this.value = '0';
        }

        this.convertRestOfUnits(); // CONVERT OTHERS UNITS
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
        if (this.value === '0') {
            for (let unit of this.Units) {
                unit.value = '0';
            }
        } else {
            let universalValue = 0;
            switch (this.choosedUnitIndex) {
                case 0: // MILs
                    universalValue = +this.value * 1609.344;
                    break;
                case 1: // SEA MILs
                    universalValue = +this.value * 1852;
                    break;
                case 2: // YARDs
                    universalValue = +this.value * 0.9144;
                    break;
                case 3: // FEETs
                    universalValue = +this.value * 0.3048;
                    break;
                case 4: // KMs
                    universalValue = +this.value * 1000;
                    break;
                case 5: // METERs (UNIVERSAL UNIT)
                    universalValue = +this.value;
                    break;
                case 6: // CMs
                    universalValue = +this.value * 0.01;
                    break;
                case 7: // MMs
                    universalValue = +this.value * 0.001;
                    break;
                case 8: // CALs 
                    universalValue = +this.value * 0.0254;
                    break;
                default:
                    console.error('Transistion to Universal Unit ERROR!!!');
                    break;
            }

            for (let unit of this.Units) {
                let convertedValue = 0;
                switch (unit.symbol) {
                    case 'mil':
                        convertedValue = universalValue * 0.000621371192;
                        break;
                    case 'nmil':
                        convertedValue = universalValue * 0.000539956803;
                        break;
                    case 'yd':
                        convertedValue = universalValue * 1.093613298;
                        break;
                    case 'ft':
                        convertedValue = universalValue * 3.280839895;
                        break;
                    case 'km':
                        convertedValue = universalValue * 0.001;
                        break;
                    case 'm':
                        convertedValue = universalValue;
                        break;
                    case 'cm':
                        convertedValue = universalValue * 100;
                        break;
                    case 'mm':
                        convertedValue = universalValue * 1000;
                        break;
                    case 'cal':
                        convertedValue = universalValue * 39.3700787402;
                        break;
                    default:
                        console.error('Transision from UniValue to Converted Value ERROR!!!');
                        break;
                }
                let precision = 0;
                let beforeComma = convertedValue.toString().split('.')[0];
                let afterComma = convertedValue.toString().split('.')[1];
                if (afterComma !== undefined) {
                    afterComma = afterComma.substring(0,3);
                    let afterCommaTable = Array.from(afterComma);
                    let firstZero = false;
                    let secondZero = false;
                    let numIndex = 0;
                    for (let oneNumber of afterCommaTable) {
                        if (oneNumber === '0') {
                            if (firstZero) {
                                secondZero = true;
                                break;
                            } else if(firstZero || numIndex === 3) {
                                secondZero = true;
                            }
                            firstZero = true;
                        }
                        
                        numIndex = ++numIndex;
                    }
                    if (secondZero) {
                        precision = numIndex - 1;
                    } else {
                        precision = numIndex;
                    }
                }
                // console.log(unit.symbol + " " + convertedValue+" "+afterComma);
                if(afterComma !== undefined && precision !== 0){
                    unit.value = beforeComma + "." + afterComma.substring(0,precision);
                } else {
                    unit.value = beforeComma;
                }
                if(unit.active === true){ // SET VALUE OF SELECTED UNIT WITHOUT CONVERSSION
                    unit.value = this.value;
                }
            }
        }
    }
}

