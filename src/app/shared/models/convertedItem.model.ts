export type convertMode = 'toUniversal' | 'toUnit';

export class ConvertedItem{
    constructor (
        public active: boolean,
        public universalValue: boolean,
        public ratioToUniversalValue: number,
        public name: string,
        public symbol: string,
        public value: number,
    ) {}

    convert(convertMode: convertMode,givenValue: number): void | number{
        switch(convertMode){
            case 'toUnit':
                    this.value = givenValue / this.ratioToUniversalValue;
                break;
            case 'toUniversal':
                    return givenValue * this.ratioToUniversalValue;
            default:
                console.error('Error in conversion in ConvertedItemModel !!!');
                break;
        }
    }
}