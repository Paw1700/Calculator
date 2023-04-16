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

    convert(convertMode: convertMode,givenValue: number): number{
        switch(convertMode){
            case 'toUnit':
                    return (givenValue / this.ratioToUniversalValue);
            case 'toUniversal':
                    return (givenValue * this.ratioToUniversalValue);
            default:
                console.error('Error in conversion in ConvertedItemModel !!!');
                return 0;
        }
    }
}