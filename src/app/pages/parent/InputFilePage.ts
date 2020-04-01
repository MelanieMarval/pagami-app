import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { IonContent } from '@ionic/angular';

export class InputFilePage implements AfterViewInit {

    @ViewChild('ionContent', {static: false}) protected ionContent: IonContent;
    @ViewChild('itemLocation', {static: false, read: ElementRef}) protected itemLocation: ElementRef;

    protected googleMaps: any;
    protected autocompleteService: any;
    // protected geocoder: any;
    protected places: any[] = [];

    protected fileData: any;
    protected previewUrl: string | ArrayBuffer;

    constructor(protected geolocationService: GeolocationService) {
    }

    async ngAfterViewInit() {
        this.googleMaps = await this.geolocationService.getGoogleMaps();
        this.autocompleteService = new this.googleMaps.places.AutocompleteService();
        // this.geocoder = new this.googleMaps.Geocoder();
    }

    searchPlace(e, scroll = false) {
        if (e.value.length > 0) {
            if (this.itemLocation.nativeElement.classList.contains('item-has-focus') === true) {
                const config = {
                    types: ['geocode'],
                    input: e.value
                };
                this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
                    if (status === this.googleMaps.places.PlacesServiceStatus.OK && predictions) {
                        this.places = [];
                        predictions.forEach((prediction) => {
                            this.places.push(prediction);
                            // this.geocoder.geocode({
                            //         placeId: prediction.place_id
                            //     // tslint:disable-next-line:no-shadowed-variable
                            //     }, (responses, status) => {
                            //         console.log(status);
                            //         if (status === 'OK') {
                            //             const lat = responses[0].geometry.location;
                            //             console.log(lat);
                            //         }
                            //     });
                        });
                    }
                    if (scroll) {
                        this.ionContent.scrollToBottom(200).then();
                    }
                });
            } else {
                this.places = [];
            }
        } else {
            this.places = [];
        }
    }

    private preview() {
        const mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        // tslint:disable-next-line:variable-name
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
        };

    }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
        this.preview();
    }

}
