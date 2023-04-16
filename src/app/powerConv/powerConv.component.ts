import { Component } from "@angular/core";
import { ConvertedItem } from "../shared/models/convertedItem.model";

@Component({
    selector: 'powerConv',
    templateUrl: './powerConv.component.html',
    styleUrls: ['./powerConv.component.scss']
})
export class PowerConverterComponent {
    

    /* OLD SOLUTION
    Units: ConvertedItem[] = [
        new ConvertedItem(true, 'Petawaty', '0', 'PW'),
        new ConvertedItem(false, 'Terrawaty', '0', 'TW'),
        new ConvertedItem(false, 'Gigawaty', '0', 'GW'),
        new ConvertedItem(false, 'Megawaty', '0', 'MW'),
        new ConvertedItem(false, 'Kilowaty', '0', 'kW'),
        new ConvertedItem(false, 'Waty', '0', 'W'), // UNIVERSAL VALUE
        new ConvertedItem(false, 'Konie mechaniczne', '0', 'KM')
    ]
    private choosedUnitIndex: number = 0;
    private value: string = '';

    

    buttonClicked(move: string) {
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
                break;
        }
        if (this.value === '') { // RETURN ZERO
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
        if (this.value === '0') {
            for (let unit of this.Units) {
                unit.value = '0';
            }
        } else {
            let universalValue = 0;
            switch (this.choosedUnitIndex) {
                case 0: // PW
                    universalValue = +this.value * Math.pow(10, 15);
                    break;
                case 1: // TW
                    universalValue = +this.value * Math.pow(10, 12);
                    break;
                case 2: // GW
                    universalValue = +this.value * Math.pow(10, 9);
                    break;
                case 3: //MW
                    universalValue = +this.value * Math.pow(10, 6);
                    break;
                case 4: // kW
                    universalValue = +this.value * Math.pow(10, 3);
                    break;
                case 5: // W
                    universalValue = +this.value;
                    break;
                case 6: // KM
                    universalValue = +this.value * 745.7;
                    break;
                default:
                    console.error('Transistion to Universal Unit ERROR!!!');
                    break;
            }
            console.log('_____________');
            for (let unit of this.Units) {
                let convertedValue = 0;
                switch (unit.symbol) {
                    case 'PW':
                        convertedValue = universalValue * Math.pow(10, -15);
                        break;
                    case 'TW':
                        convertedValue = universalValue * Math.pow(10, -12);
                        break;
                    case 'GW':
                        convertedValue = universalValue * Math.pow(10, -9);
                        break;
                    case 'MW':
                        convertedValue = universalValue * Math.pow(10, -6);
                        break;
                    case 'kW':
                        convertedValue = universalValue * Math.pow(10, -3);
                        break;
                    case 'W':
                        convertedValue = universalValue;
                        break;
                    case 'KM':
                        convertedValue = universalValue / 745.7;
                        break;
                    default:
                        console.error('Transision from UniValue to Converted Value ERROR!!!');
                        break;
                }
                let precision = 4;
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
    */
}