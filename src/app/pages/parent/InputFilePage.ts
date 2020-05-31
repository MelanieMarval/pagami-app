import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { GeolocationService } from '../../core/geolocation/geolocation.service';
import { IonContent } from '@ionic/angular';
import { CompressImageProvider } from '../../providers/compress-image.provider';
import { ToastProvider } from '../../providers/toast.provider';

export class InputFilePage implements AfterViewInit {

    @ViewChild('ionContent', {static: false}) protected ionContent: IonContent;
    @ViewChild('itemLocation', {static: false, read: ElementRef}) protected itemLocation: ElementRef;

    protected googleMaps: any;
    protected autocompleteService: any;
    protected places: any[] = [];

    protected fileData: any;
    protected previewUrl: string | ArrayBuffer;

    constructor(protected geolocationService: GeolocationService) {
    }

    async ngAfterViewInit() {
        this.googleMaps = await this.geolocationService.getGoogleMaps();
        this.autocompleteService = new this.googleMaps.places.AutocompleteService();
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

    async chargeImage(event: any) {
        const imageBlob = await CompressImageProvider.handleImageUpload(event);
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
            this.fileData = imageBlob;
            this.previewUrl = reader.result;
        };
    }

    async chargeImageFile(file: string) {
        const imageBlob = await CompressImageProvider.handleImageUploadFile(file, 'test');
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
            this.fileData = imageBlob;
            this.previewUrl = reader.result;
        };
    }

    // preview() {
    //     const mimeType = this.fileData.type;
    //     if (mimeType.match(/image\/*/) == null) {
    //         return;
    //     }
    //
    //     const reader = new FileReader();
    //     reader.readAsDataURL(this.fileData);
    //     // tslint:disable-next-line:variable-name
    //     reader.onload = (_event) => {
    //         this.previewUrl = reader.result;
    //     };
    //
    // }
    //
    // fileProgress(fileInput: any) {
    //     this.fileData = fileInput.target.files[0] as File;
    //     this.preview();
    // }

}
