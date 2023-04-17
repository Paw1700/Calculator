export type convertMode = 'toUniversal' | 'toUnit';

export class ConvertedItem {
    constructor(
        public active: boolean,
        public universalUnit: boolean,
        public ratioToUniversalValue: number,
        public addToUniversalValue: boolean,
        public addToUniVerNumber: number,
        public name: string,
        public symbol: string,
        public value: number,
        public minusForbidden?: boolean,
        public forbiddenMessage?: string,
    ) { }

    convert(convertMode: convertMode, givenValue: number): number {
        switch (convertMode) {
            case 'toUnit':
                if(this.addToUniversalValue){
                    return (this.ratioToUniversalValue * givenValue) + this.addToUniVerNumber;
                } else {
                    return (givenValue / this.ratioToUniversalValue);
                }
            case 'toUniversal':
                if(this.addToUniversalValue){
                    return (givenValue - this.addToUniVerNumber) / this.ratioToUniversalValue;
                } else {
                    return (givenValue * this.ratioToUniversalValue);
                }
            default:
                console.error('Error in conversion in ConvertedItemModel !!!');
                return 0;
        }
    }
}