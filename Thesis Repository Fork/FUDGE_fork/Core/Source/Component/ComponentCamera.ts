/// <reference path="Component.ts"/>
namespace FudgeCore {

    /**
     * The camera component holds the projection-matrix and other data needed to render a scene from the perspective of the node it is attached to.
     * @authors Jascha Karagöl, HFU, 2019 | Jirka Dell'Oro-Friedl, HFU, 2019
     */
    export class ComponentCamera extends Component {

        public camera: Camera; // The camera used to render

        public pivot: Matrix4x4 = Matrix4x4.IDENTITY;
        public projection: PROJECTION = null;
        public transform: Matrix4x4 = Matrix4x4.IDENTITY; // The matrix to multiply each scene objects transformation by, to determine where it will be drawn.
       // let caa;

        public setType<T extends Camera>(_class: new () => T): void {
            this.camera = new _class();
            this.transform = this.camera.transform;
            this.pivot = this.camera.pivot;

            console.log(this);
        }

        /**
         * Returns the multiplikation of the worldtransformation of the camera container with the projection matrix
         * @returns the world-projection-matrix
         */
        public get ViewProjectionMatrix(): Matrix4x4 {
            let world: Matrix4x4 = this.pivot;
            try {
                world = Matrix4x4.MULTIPLICATION(this.getContainer().mtxWorld, this.pivot);
            } catch (_error) {                
                // no container node or no world transformation found -> continue with pivot only
            }
            let viewMatrix: Matrix4x4 = Matrix4x4.INVERSION(world);
            return Matrix4x4.MULTIPLICATION(this.transform, viewMatrix);
        }
 
        //#region Transfer
        public serialize(): Serialization {
            let serialization: Serialization = {
                backgroundColor: this.camera.backgroundColor,
                backgroundEnabled: this.camera.backgroundEnabled,
                projection: this.projection,
                fieldOfView: this.camera.fieldOfView,
                direction: this.camera.direction,
                aspect: this.camera.aspectRatio,
                pivot: this.pivot.serialize(),
                [super.constructor.name]: super.serialize()
            };
            return serialization;
        }

        public deserialize(_serialization: Serialization): Serializable {
            this.camera.backgroundColor = _serialization.backgroundColor;
            this.camera.backgroundEnabled = _serialization.backgroundEnabled;
            this.projection = _serialization.projection;
            this.camera.fieldOfView = _serialization.fieldOfView;
            this.camera.aspectRatio = _serialization.aspect;
            this.camera.direction = _serialization.direction;
            this.pivot.deserialize(_serialization.pivot);
            super.deserialize(_serialization[super.constructor.name]);
            switch (this.projection) {
                case PROJECTION.ORTHOGRAPHIC:
                    // this.projectOrthographic(); // TODO: serialize and deserialize parameters
                    break;
                case PROJECTION.CENTRAL:
                  //  this.camera = new CameraPerspective();
                    break;
            }
            return this;
        }

        public getMutatorAttributeTypes(_mutator: Mutator): MutatorAttributeTypes {
            let types: MutatorAttributeTypes = super.getMutatorAttributeTypes(_mutator);
            if (types.direction)
                types.direction = FIELD_OF_VIEW;
            if (types.projection)
                types.projection = PROJECTION;
            return types;
        }

        public mutate(_mutator: Mutator): void {
            super.mutate(_mutator);

            switch (this.projection) {
                case PROJECTION.CENTRAL:
                    this.camera = new CameraPerspective();
                    break;
            }
        }

        protected reduceMutator(_mutator: Mutator): void {
            delete _mutator.transform;
            super.reduceMutator(_mutator);
        }
        //#endregion
    }
}