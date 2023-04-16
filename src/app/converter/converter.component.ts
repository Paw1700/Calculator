import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
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
        units: ConvertedItem[]
    }[] = [
            {
                unitType: "power",
                units: [
                    new ConvertedItem(true, false, 1000000000000000, 'Petawat', 'PW', 0),
                    new ConvertedItem(false, false, 1000000000000, 'Terrawat', 'TW', 0),
                    new ConvertedItem(false, false, 1000000000, 'Gigawat', 'GW', 0),
                    new ConvertedItem(false, false, 1000000, 'Megawat', 'MW', 0),
                    new ConvertedItem(false, false, 1000, 'Kilowat', 'kW', 0),
                    new ConvertedItem(false, true, 1, 'Kilowat', 'W', 0),
                    new ConvertedItem(false, false, 0.0013596216, 'Konie mechaniczne', 'KM', 0),
                ]
            }
        ]

    value = '0';
    convserionType: string | null = 'power';
    indexOfWantedTypeUnit = 0;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.convserionType = this.route.snapshot.paramMap.get('conversionType');
        console.log(this.Units);
        this.indexOfWantedTypeUnit = this.Units.findIndex(
            unit => {
                unit.unitType === 'power';
            }
        );

        console.log(this.convserionType);

        console.log(this.indexOfWantedTypeUnit);
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
        }
        switch (this.convserionType) {
            case 'power':
                let indexOfUniversalUnit = this.Units[this.indexOfWantedTypeUnit].units.findIndex(
                    unit => {
                        unit.universalValue === true;
                    }
                )
                let universalValue = this.Units[this.indexOfWantedTypeUnit].units[indexOfUniversalUnit].convert('toUniversal', +this.value);
                for (let unit of this.Units[this.indexOfWantedTypeUnit].units) {
                    unit.value = unit.convert('toUnit', universalValue);
                }
                break;
        }
        if (this.value === '') { // RETURNING 0 FOR STRING
            this.value = '0';
        }
    }
}

