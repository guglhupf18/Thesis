// The main camera class for ComponentCamera to interact with

namespace FudgeCore {
    export enum FIELD_OF_VIEW {
        HORIZONTAL, VERTICAL, DIAGONAL
    }
    /**
     * Defines identifiers for the various projections a camera can provide.  
     * TODO: change back to number enum if strings not needed
     */
    export enum PROJECTION {
        CENTRAL = "central",
        ORTHOGRAPHIC = "orthographic",
        DIMETRIC = "dimetric",
        STEREO = "stereo",
        CAVALIER = "cavalier",
        CABINETT = "cabinett"
    }

    export class Camera {
        public pivot: Matrix4x4 = null;
        public projection: PROJECTION = null; // the projection of the camera (default = perspective)
        public transform: Matrix4x4 = new Matrix4x4; // The matrix to multiply each scene objects transformation by, to determine where it will be drawn.

        public backgroundColor: Color = new Color(0, 0, 0, 1); // The color of the background the camera will render.
        public backgroundEnabled: boolean = true; // Determines whether or not the background of this camera will be rendered.
        // TODO: examine, if background should be an attribute of Camera or Viewport
        public fieldOfView: number = null; // The camera's sensorangle.
        public aspectRatio: number = null;
        public direction: FIELD_OF_VIEW = null;

        constructor() {
            this.pivot = Matrix4x4.IDENTITY;
        }

        public setProjection(cam: Camera): void {
            
            this.projection = cam.projection;
            this.transform = cam.transform;
            
        }
        /*
                public setProjectionMatrix(projection: PROJECTION): Matrix4x4 {
                    
                    switch (projection) {
                        case PROJECTION.CENTRAL:
                            this.camera = new CameraPerspective();
                            break;
                        case PROJECTION.ORTHOGRAPHIC:
                            this.camera = new CameraOrthographic();
                            break;
                        case PROJECTION.CABINETT:
                            this.camera = new CameraCabinett();
                            break;
                        case PROJECTION.CAVALIER:
                            this.camera = new CameraCavalier();
                            break;
                        default:
                            console.log("No camera projection selected");
                            break;
                    }
                    
                    return this.transform;
                }
        */
        public getProjection(): PROJECTION {
            return this.projection;
        }


        public getBackgoundColor(): Color {
            return this.backgroundColor;
        }

        public getBackgroundEnabled(): boolean {
            return this.backgroundEnabled;
        }
        /**
        * Return the calculated normed dimension of the projection space
        */
        public getProjectionRectangle(): Rectangle {
            let tanFov: number = Math.tan(Math.PI * this.fieldOfView / 360); // Half of the angle, to calculate dimension from the center -> right angle
            let tanHorizontal: number = 0;
            let tanVertical: number = 0;

            if (this.direction == FIELD_OF_VIEW.DIAGONAL) {
                let aspect: number = Math.sqrt(this.aspectRatio);
                tanHorizontal = tanFov * aspect;
                tanVertical = tanFov / aspect;
            }
            else if (this.direction == FIELD_OF_VIEW.VERTICAL) {
                tanVertical = tanFov;
                tanHorizontal = tanVertical * this.aspectRatio;
            }
            else {//FOV_DIRECTION.HORIZONTAL
                tanHorizontal = tanFov;
                tanVertical = tanHorizontal / this.aspectRatio;
            }

            return Rectangle.GET(0, 0, tanHorizontal * 2, tanVertical * 2);
        }

           /**
         * Returns the multiplikation of the worldtransformation of the camera container with the projection matrix
         * @returns the world-projection-matrix
         */
        public get ViewProjectionMatrix(): Matrix4x4 {
            let world: Matrix4x4 = this.pivot;
           
            let viewMatrix: Matrix4x4 = Matrix4x4.INVERSION(world);
            return Matrix4x4.MULTIPLICATION(this.transform, viewMatrix);
        }
    }

    
}
