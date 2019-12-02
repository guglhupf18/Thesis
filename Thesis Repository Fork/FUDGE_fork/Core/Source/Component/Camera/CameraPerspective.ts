// Class to set camera to perspective mode
/**
 * @param _aspect The aspect ratio between width and height of projectionspace.(Default = canvas.clientWidth / canvas.ClientHeight)
 * @param _fieldOfView The field of view in Degrees. (Default = 45)
 * @param _direction The plane on which the fieldOfView-Angle is given 
 * 
 *
 */
/// <reference path="Camera.ts"/>

namespace FudgeCore {

    export class CameraPerspective extends Camera {

        public fieldOfView: number = 45; // The camera's sensorangle.
        public aspectRatio: number = 1.0;
        public direction: FIELD_OF_VIEW = FIELD_OF_VIEW.DIAGONAL;
        public test: number = 0;
        public near: number = 1;
        public far: number = 2000;

        constructor() {
            super();
            
            this.projection = PROJECTION.CENTRAL;
            this.transform = Matrix4x4.PROJECTION_CENTRAL(this.aspectRatio, this.fieldOfView, this.near, this.far, this.direction); // TODO: remove magic numbers
        }

        public getAspect(): number {
            return this.aspectRatio;
        }

        public getFieldOfView(): number {
            return this.fieldOfView;
        }

        public getDirection(): FIELD_OF_VIEW {
            return this.direction;
        }


    }
}