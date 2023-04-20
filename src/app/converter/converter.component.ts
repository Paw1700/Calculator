import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConvertedItem } from "../shared/models/convertedItem.model";
import { trigger, transition, style, animate } from "@angular/animations";

// type Move = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | 'return' | 'comma'

@Component({
    selector: 'converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss'],
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
                animate('250ms ease-out', style({
                    opacity: 0,
                    height: '0'
                }))
            ])
        ])
    ]
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
                    new ConvertedItem(true, false, 1000000000000000, false, 0, 'Petawat', 'PW', 0),
                    new ConvertedItem(false, false, 1000000000000, false, 0, 'Terrawat', 'TW', 0),
                    new ConvertedItem(false, false, 1000000000, false, 0, 'Gigawat', 'GW', 0),
                    new ConvertedItem(false, false, 1000000, false, 0, 'Megawat', 'MW', 0),
                    new ConvertedItem(false, false, 1000, false, 0, 'Kilowat', 'kW', 0),
                    new ConvertedItem(false, true, 1, false, 0, 'Wat', 'W', 0),
                    new ConvertedItem(false, false, 735.8351729213, false, 0, 'Konie mechaniczne', 'KM', 0),
                ]
            },
            {
                unitType: 'time',
                allowMinus: false,
                units: [
                    new ConvertedItem(true, true, 1, false, 0, 'Sekund', 's', 0),
                    new ConvertedItem(false, false, 60, false, 0, 'Minuta', 'min', 0),
                    new ConvertedItem(false, false, 3600, false, 0, 'Godzin', 'h', 0),
                    new ConvertedItem(false, false, 86400, false, 0, 'Dni', 'd', 0),
                    new ConvertedItem(false, false, 604800, false, 0, 'Tygodni', 't', 0),
                    new ConvertedItem(false, false, 2419200, false, 0, 'Miesiąc', 'm', 0),
                    new ConvertedItem(false, false, 29030400, false, 0, 'Lat', 'y', 0),
                ]
            },
            {
                unitType: 'temperature',
                allowMinus: true,
                units: [
                    new ConvertedItem(true, true, 1, false, 0, 'Kelwin', 'K', 0, true, 'Nie istnieje temperatura nizsza niz 0 Kelwinow!'),
                    new ConvertedItem(false, false, 1, true, -273.15, 'Cecjusza', 'C', -273.15),
                    new ConvertedItem(false, false, 1.8, true, -459.67, 'Faranhaiet', 'F', -459.67),
                ]
            },
            {
                unitType: 'length',
                allowMinus: false,
                units: [
                    new ConvertedItem(true, false, 1609.344, false, 0, 'Mil', 'mil', 0),
                    new ConvertedItem(false, false, 1852, false, 0, 'Mil morska', 'nmil', 0),
                    new ConvertedItem(false, false, 0.9144, false, 0, 'Jard', 'yd', 0),
                    new ConvertedItem(false, false, 0.3048, false, 0, 'Stopa', 'ft', 0),
                    new ConvertedItem(false, false, 1000, false, 0, 'Kilometr', 'km', 0),
                    new ConvertedItem(false, true, 1, false, 0, 'Metr', 'm', 0),
                    new ConvertedItem(false, false, 0.01, false, 0, 'Centymetr', 'cm', 0),
                    new ConvertedItem(false, false, 0.001, false, 0, 'Minimetry', 'mm', 0),
                    new ConvertedItem(false, false, 0.0254, false, 0, 'Cal', 'inch', 0),
                ]
            }
        ]

    value = '0';
    convserionType: string | null = '';
    indexOfWantedTypeUnit = 0;
    allowMinus = false;
    minusForbiddenWarning = false;
    forbiddenMessage:string | undefined = '';

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.convserionType = this.route.snapshot.params['conversionType'];
        this.changeType(this.convserionType);
    }

    changeType(conversionType: string | null) {
        if (conversionType !== null) {
            this.indexOfWantedTypeUnit = this.Units.findIndex(unit => unit.unitType === conversionType);

            this.allowMinus = this.Units[this.indexOfWantedTypeUnit].allowMinus;
            let indexOfActivUnit = this.Units[this.indexOfWantedTypeUnit].units.findIndex(unit => unit.active);
            // console.log(indexOfActivUnit);
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
            case 'length':
            case 'temperature':
            case 'power':
                let indexOfChoosedUnit = this.Units[this.indexOfWantedTypeUnit].units.findIndex(unit => unit.active === true)
                let universalValue = this.Units[this.indexOfWantedTypeUnit].units[indexOfChoosedUnit].convert('toUniversal', +this.value);
                for (let unit of this.Units[this.indexOfWantedTypeUnit].units) {
                    unit.value = Math.round(unit.convert('toUnit', universalValue) * 1e2) / 1e2;
                    if(unit.minusForbidden && unit.value < 0 && !this.minusForbiddenWarning){
                        this.minusForbiddenWarning = true;
                        this.forbiddenMessage = unit.forbiddenMessage;
                    } else if (unit.minusForbidden && unit.value >= 0 && this.minusForbiddenWarning){
                        this.minusForbiddenWarning = false;
                        this.forbiddenMessage = '';
                    }
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

