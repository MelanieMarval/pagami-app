import { Component, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../providers/toast.provider';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { GeolocationService } from '../../../../core/geolocation/geolocation.service';
import { InputFilePage } from '../../../parent/InputFilePage';
import { CameraResultType, CameraSource, Device, Plugins } from '@capacitor/core';
import { FireStorage } from '../../../../core/fire-storage/fire.storage';
import { PlacesService } from '../../../../core/api/places/places.service';
import { StorageProvider } from '../../../../providers/storage.provider';
import { Place } from '../../../../core/api/places/place';

@Component({
    selector: 'page-flyer',
    templateUrl: 'flyer.html',
    styleUrls: ['./flyer.scss'],
})

export class FlyerPage extends InputFilePage implements OnInit {

    private place: Place;
    loading: any;
    isHiddenAddButton = false;
    updating: boolean;
    isTest: boolean;
    flyer: any = {
        textList: [''],
        title: '',
        photoUrl: ''
    };

    constructor(private toast: ToastProvider,
                private actionSheetController: ActionSheetController,
                private alertController: AlertController,
                private fireStorage: FireStorage,
                private storage: StorageProvider,
                private placesService: PlacesService,
                protected geolocationService: GeolocationService) {
        super(geolocationService);
    }

    async ngOnInit() {
        const info = await Device.getInfo();
        console.log(info);
        this.isTest = info.platform === 'web';
        this.place = await this.storage.getBusinessVerifiedByUser();
    }

    addWord() {
        // esto es un por si a las...
        if (this.flyer.textList.length >= 8) {
            this.isHiddenAddButton = true;
            return this.toast.messageDefault('El maximo es de 8, recuerde guardar antes de salir', 'bottom');
        }
        this.flyer.textList.push('');
        if (this.flyer.textList.length === 8) {
            this.isHiddenAddButton = true;
        }
    }


    deleteWord(i: number) {
        this.flyer.textList.splice(i, 1);
        this.isHiddenAddButton = false;
    }

    async takeImage() {
        const self = this;
        const actionSheet = await this.actionSheetController.create({
            cssClass: 'action-sheet-custom-class',
            header: 'Seleccione una opción:',
            buttons: [{
                text: 'Tomar una Foto',
                icon: 'camera',
                handler: () => {
                    self.captureImage(true);
                }
            }, {
                text: 'Buscar Foto en la Galeria',
                icon: 'image',
                handler: () => {
                    self.captureImage(false);
                }
            }]
        });
        await actionSheet.present();
    }

    async captureImage(fromCamera: boolean) {
        const options = {
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: fromCamera ? CameraSource.Camera : CameraSource.Photos,
        };

        const image = await Plugins.Camera.getPhoto(options);
        await this.chargeImage(this.isTest, image.dataUrl);
    }

    async validateFlyer() {
        if (this.flyer.title.trim().length <= 2) {
            return this.toast.messageErrorWithoutTabs('Debe agregar un titulo al volante');
        }
        for (const word of this.flyer.textList) {
            if (word.trim().length <= 1) {
                return this.toast.messageErrorWithoutTabs('Debe rellenar todos los campos o eliminar el no deseado');
            }
            if (word.trim().length > 36) {
                return this.toast.messageErrorWithoutTabs('Las palabras no pueden exceder los 36 caracteres');
            }
        }
        if (!this.previewUrl) {
            return this.toast.messageErrorWithoutTabs('Debe colocar una imagen');
        }
        const success = await this.fireStorage.saveFlyerImage(this.fileData);
        if (success) {
            this.flyer.photoUrl = success;
            this.updateFlyer();
        } else {
            return this.toast.messageErrorWithoutTabs('Su imagen no ha podido cargarse');
        }
    }

    updateFlyer() {
        this.placesService.addFlyer(this.place.id, this.flyer)
            .then(success => {
                console.log('-> success', success);
            });
    }

    async confirmDelete() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Esta seguro?',
            message: 'Una vez eliminado su volante digital no podra recuperarlo',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Si, Eliminar',
                    handler: () => {
                        this.deleteFlyer();
                    }
                }
            ]
        });

        await alert.present();
    }

    deleteFlyer() {
        console.log('Eliminar flyer');
    }

    trackByIdx(index: number, obj: any): any {
        return index;
    }

}
