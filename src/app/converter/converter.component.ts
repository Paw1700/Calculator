import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConvertedItem } from "../shared/models/convertedItem.model";

// type Move = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | 'return' | 'comma'

@Component({
    selector: 'converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
    Units: {
        unitType: string,
        allowMinus: boolean,
        units: ConvertedItem[]
    }[] = [
            {
                unitType: "power",
                allowMinus: false,
                units: [
                    new ConvertedItem(true, false, 1000000000000000, 'Petawat', 'PW', 0),
                    new ConvertedItem(false, false, 1000000000000, 'Terrawat', 'TW', 0),
                    new ConvertedItem(false, false, 1000000000, 'Gigawat', 'GW', 0),
                    new ConvertedItem(false, false, 1000000, 'Megawat', 'MW', 0),
                    new ConvertedItem(false, false, 1000, 'Kilowat', 'kW', 0),
                    new ConvertedItem(false, true, 1, 'Wat', 'W', 0),
                    new ConvertedItem(false, false, 735.8351729213, 'Konie mechaniczne', 'KM', 0),
                ]
            },
            {
                unitType: 'time',
                allowMinus: false,
                units: [
                    new ConvertedItem(true, true, 1, 'Sekund', 's', 0),
                    new ConvertedItem(false, false, 60, 'Minuta', 'min', 0),
                    new ConvertedItem(false, false, 3600, 'Godzin', 'h', 0),
                    new ConvertedItem(false, false, 86400, 'Dni', 'd', 0),
                    new ConvertedItem(false, false, 604800, 'Tygodni', 't', 0),
                    new ConvertedItem(false, false, 2419200, 'Miesiąc', 'm', 0),
                ]
            }
        ]

    value = '0';
    convserionType: string | null = '';
    indexOfWantedTypeUnit = 0;
    allowMinus = false;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.convserionType = this.route.snapshot.params['conversionType'];
        this.changeType(this.convserionType);
    }

    changeType(conversionType: string | null) {
        if(conversionType !== null){
            this.indexOfWantedTypeUnit = this.Units.findIndex(unit => unit.unitType === conversionType);
            this.allowMinus = this.Units[this.indexOfWantedTypeUnit].allowMinus;
            let indexOfActivUnit = this.Units[this.indexOfWantedTypeUnit].units.findIndex(unit => unit.active)
            this.value = (this.Units[this.indexOfWantedTypeUnit].units[indexOfActivUnit].value).toString();
        }
    }

    buttonClicked(moveByUser: string) {
        if (this.value === '0') { // SETTING EMPTY STRING FOR FUNCTION
            this.value = ''
        }
        switch (moveByUser) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.value += moveByUser;
                break;
            case 'return':
                this.value = this.value.substring(0, this.value.toString().length - 1);
                break;
            case 'comma':
                if (!this.value.includes('.')) {
                    if (this.value === '') {
                        this.value = '0.';
                    } else {
                        this.value += '.';
                    }
                }
                break;
            case 'plusMinus':
                this.value = (+this.value * -1).toString();
                break;
        }
        switch (this.convserionType) {
            case 'time':
            case 'power':
                let indexOfChoosedUnit = this.Units[this.indexOfWantedTypeUnit].units.findIndex(unit => unit.active === true)
                let universalValue = this.Units[this.indexOfWantedTypeUnit].units[indexOfChoosedUnit].convert('toUniversal', +this.value);
                for (let unit of this.Units[this.indexOfWantedTypeUnit].units) {
                    unit.value = Math.round(unit.convert('toUnit', universalValue) * 1e4) / 1e4;
                }
                break;
        }
        if (this.value === '') { // RETURNING 0 FOR STRING
            this.value = '0';
        }
    }

    changeUnit(id: number): void {
        let oldUnitId = this.Units[this.indexOfWantedTypeUnit].units.findIndex(unit => unit.active === true);
        this.Units[this.indexOfWantedTypeUnit].units[oldUnitId].active = false;
        this.Units[this.indexOfWantedTypeUnit].units[id].active = true;
        this.value = '';
    }
}

