namespace FudgeCore {
    /**
     * Attaches a [[ComponentAudio]] to a [[Node]].
     * Only a single [[Audio]] can be used within a single [[ComponentAudio]]
     * @authors Thomas Dorner, HFU, 2019
     */
    export class ComponentAudio extends Component implements Serializable {
        
        public audio: Audio | null;
        public audioOscillator: AudioOscillator;

        public isLocalised: boolean = false;
        public isFiltered: boolean = false;
        public isDelayed: boolean = false;
        
        protected singleton: boolean = false;

        private localisation: AudioLocalisation | null;
        private filter: AudioFilter | null;
        private delay: AudioDelay | null;
        
        /**
         * Create Component Audio for 
         * @param _audio 
         */
        constructor(_audio?: Audio, _audioOscillator?: AudioOscillator) {
            super();
            if (_audio) {
                this.setAudio(_audio);
            }
        }

        /**
         * set AudioFilter in ComponentAudio
         * @param _filter AudioFilter 
         */
        public setFilter(_filter: AudioFilter): void {
            this.filter = _filter;
            this.isFiltered = true;
        }

        public getFilter(): AudioFilter {
            return this.filter;
        }

        public setDelay(_delay: AudioDelay): void {
            this.delay = _delay;
            this.isDelayed = true;
        }

        public getDelay(): AudioDelay {
            return this.delay;
        }

        public setLocalisation(_localisation: AudioLocalisation): void {
            this.localisation = _localisation;
            this.isLocalised = true;
        }

        public getLocalisation(): AudioLocalisation {
            return this.localisation;
        }

        /**
         * Play Audio at current time of AudioContext
         */
        public playAudio(_audioSettings: AudioSettings, _offset?: number, _duration?: number): void {
            this.audio.initBufferSource(_audioSettings);
            this.connectAudioNodes(_audioSettings);
            this.audio.getBufferSourceNode().start(_audioSettings.getAudioContext().currentTime, _offset, _duration);
        }

        /**
         * Adds an [[Audio]] to the [[ComponentAudio]]
         * @param _audio Audio Data as [[Audio]]
         */
        public setAudio(_audio: Audio): void {
            this.audio = _audio;
        }

        public getAudio(): Audio {
            return this.audio;
        }

        //#region Transfer
        public serialize(): Serialization {
            let serialization: Serialization = {
                isFiltered: this.isFiltered,
                isDelayed: this.isDelayed,
                isLocalised: this.isLocalised,
                audio: this.audio,
                filter: this.filter,
                delay: this.delay,
                localisation: this.localisation
            };
            return serialization;
        }
       
        public deserialize(_serialization: Serialization): Serializable {
            this.isFiltered = _serialization.isFiltered;
            this.isDelayed = _serialization.isDelayed;
            this.isLocalised = _serialization.isLocalised;
            this.audio = _serialization.audio;
            this.filter = _serialization.filter;
            this.delay = _serialization.delay;

            return this;
        }

        protected reduceMutator(_mutator: Mutator): void {
            delete this.audio;
            delete this.filter;
            delete this.delay;
            delete this.localisation;
        }
        //#endregion

        /**
         * Final attachments for the Audio Nodes in following order.
         * This method needs to be called whenever there is a change of parts in the [[ComponentAudio]].
         * 1. Local Gain
         * 2. Localisation
         * 3. Filter
         * 4. Delay
         * 5. Master Gain
         */
         private connectAudioNodes(_audioSettings: AudioSettings): void {
            const bufferSource: AudioBufferSourceNode = this.audio.getBufferSourceNode();
            const lGain: GainNode = this.audio.getLocalGain();
            let panner: PannerNode;
            let filt: BiquadFilterNode;
            let delay: DelayNode;
            const mGain: GainNode = _audioSettings.masterGain;

            console.log("-------------------------------");
            console.log("Connecting Properties for Audio");
            console.log("-------------------------------");

            bufferSource.connect(lGain);

            if (this.isLocalised && this.localisation != null) {
                console.log("Connect Localisation");
                panner = this.localisation.pannerNode;
                lGain.connect(panner);

                if (this.isFiltered && this.filter != null) {
                    console.log("Connect Filter");
                    filt = this.filter.audioFilter;
                    panner.connect(filt);

                    if (this.isDelayed && this.delay != null) {
                        console.log("Connect Delay");
                        delay = this.delay.audioDelay;
                        filt.connect(delay);
                        console.log("Connect Master Gain");
                        delay.connect(mGain);
                    }
                    else {
                        console.log("Connect Master Gain");
                        filt.connect(mGain);
                    }
                }
                else {
                    if (this.isDelayed && this.delay != null) {
                        console.log("Connect Delay");
                        delay = this.delay.audioDelay;
                        panner.connect(delay);
                        console.log("Connect Master Gain");
                        delay.connect(mGain);
                    }
                    else {
                        console.log("Connect Master Gain");
                        panner.connect(mGain);
                    }
                }
            }
            else if (this.isFiltered && this.filter != null) {
                console.log("Connect Filter");
                filt = this.filter.audioFilter;
                lGain.connect(filt);

                if (this.isDelayed && this.delay != null) {
                    console.log("Connect Delay");
                    delay = this.delay.audioDelay;
                    filt.connect(delay);
                    console.log("Connect Master Gain");
                    delay.connect(mGain);
                }
                else {
                    console.log("Connect Master Gain");
                    filt.connect(mGain);
                }
            }
            else if (this.isDelayed && this.delay != null) {
                console.log("Connect Delay");
                delay = this.delay.audioDelay;
                lGain.connect(delay);
                console.log("Connect Master Gain");
                delay.connect(mGain);
            }
            else {
                console.log("Connect Only Master Gain");
                lGain.connect(mGain);
            }
            console.log("-------------------------------");
        }
    }
}