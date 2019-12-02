// Camera in Cavalier Projection
/// <reference path="Camera.ts"/>

namespace FudgeCore {
    export class CameraCabinett extends Camera {

        public _alpha: number = 65;

        constructor() {
            super();
            this.projection = PROJECTION.CABINETT;
            this.transform = Matrix4x4.PROJECTION_CABINETT(this._alpha);
            //super.setProjection(this);
        }
    }
}