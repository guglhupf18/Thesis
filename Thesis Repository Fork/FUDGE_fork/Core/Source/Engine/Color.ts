namespace FudgeCore {
    /**
     * Defines a color as values in the range of 0 to 1 for the four channels red, green, blue and alpha (for opacity)
     */
    export class Color extends Mutable { //implements Serializable {
        public r: number;
        public g: number;
        public b: number;
        public a: number;

        constructor(_r: number = 1, _g: number = 1, _b: number = 1, _a: number = 1) {
            super();
            this.setNormRGBA(_r, _g, _b, _a);
        }

        public static get BLACK(): Color {
            return new Color(0, 0, 0, 1);
        }
        public static get WHITE(): Color {
            return new Color(1, 1, 1, 1);
        }
        public static get RED(): Color {
            return new Color(1, 0, 0, 1);
        }
        public static get GREEN(): Color {
            return new Color(0, 1, 0, 1);
        }
        public static get BLUE(): Color {
            return new Color(0, 0, 1, 1);
        }
        public static get YELLOW(): Color {
            return new Color(1, 1, 0, 1);
        }
        public static get CYAN(): Color {
            return new Color(0, 1, 1, 1);
        }
        public static get MAGENTA(): Color {
            return new Color(1, 0, 1, 1);
        }

        public setNormRGBA(_r: number, _g: number, _b: number, _a: number): void {
            this.r = Math.min(1, Math.max(0, _r));
            this.g = Math.min(1, Math.max(0, _g));
            this.b = Math.min(1, Math.max(0, _b));
            this.a = Math.min(1, Math.max(0, _a));
        }

        public setBytesRGBA(_r: number, _g: number, _b: number, _a: number): void {
            this.setNormRGBA(_r / 255, _g / 255, _b / 255, _a / 255);
        }

        public getArray(): Float32Array {
            return new Float32Array([this.r, this.g, this.b, this.a]);
        }

        public setArrayNormRGBA(_color: Float32Array): void {
            this.setNormRGBA(_color[0], _color[1], _color[2], _color[3]);
        }

        public setArrayBytesRGBA(_color: Uint8ClampedArray): void {
            this.setBytesRGBA(_color[0], _color[1], _color[2], _color[3]);
        }

        protected reduceMutator(_mutator: Mutator): void {/** */ }
    }
}