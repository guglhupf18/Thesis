// Camera in Cavalier Projection
/// <reference path="Camera.ts"/>

namespace FudgeCore {
    export class CameraCavalier extends Camera {

        public _alpha: number = 65;

       
        constructor() {
            super();
            this.projection = PROJECTION.CAVALIER;
            this.transform = Matrix4x4.PROJECTION_CAVALIER(this._alpha);
            console.log(this.transform);
            //super.setProjection(this);
        }
    }
}