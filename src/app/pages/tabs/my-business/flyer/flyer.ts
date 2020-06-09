import { Component, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../providers/toast.provider';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InputFilePage } from '../../../parent/InputFilePage';
// Services
import { GeolocationService } from '../../../../core/geolocation/geolocation.service';
import { PlacesService } from '../../../../core/api/places/places.service';
import { Place } from '../../../../core/api/places/place';
import { Flyer } from '../../../../core/api/places/flyer';
// Providers
import { FireStorage } from '../../../../core/fire-storage/fire.storage';
import { StorageProvider } from '../../../../providers/storage.provider';
import { UserIntentProvider } from '../../../../providers/user-intent.provider';

import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
const { Device } = Plugins;

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
    canDelete = false;
    isTest: boolean;
    flyer: Flyer = {title: '', textList: ['']};

    constructor(private toast: ToastProvider,
                private actionSheetController: ActionSheetController,
                private alertController: AlertController,
                private fireStorage: FireStorage,
                private storage: StorageProvider,
                private placesService: PlacesService,
                private router: Router,
                private intentProvider: UserIntentProvider,
                protected geolocationService: GeolocationService) {
        super(geolocationService);
    }

    async ngOnInit() {
        const info = await Device.getInfo();
        console.log(info);
        this.isTest = info.platform === 'web';
        this.loadInfo();
    }

    async loadInfo() {
        this.place = await this.storage.getBusinessVerifiedByUser();
        if (this.place.flyer) {
            this.canDelete = true;
            this.flyer = this.place.flyer;
            this.previewUrl = this.flyer.photoUrl;
        }
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
        if (this.flyer.textList.length === 0) {
            return this.toast.messageErrorWithoutTabs('Debe tener al menos una palabra clave');
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

        this.updating = true;
        if (!this.flyer.photoUrl || this.previewUrl !== this.flyer.photoUrl) {
            const success = await this.fireStorage.saveFlyerImage(this.fileData);
            if (success) {
                this.flyer.photoUrl = success;
                this.previewUrl = success;
                this.saveFlyer();
            } else {
                this.updating = false;
                return this.toast.messageErrorWithoutTabs('Su imagen no ha podido cargarse');
            }
        } else {
            this.saveFlyer();
        }
    }

    saveFlyer() {
        this.updating = true;
        this.placesService.changeFlyer(this.place.id, this.flyer)
            .then(async success => {
                if (success.passed) {
                    await this.storage.setBusinessVerifiedByUser(success.response);
                    this.intentProvider.updateMyBusiness = true;
                    this.toast.messageSuccessWithoutTabs('Su volante ha sido guardado exitosamente');
                } else {
                    this.toast.messageErrorWithoutTabs('El volante no ha podido guardarse, intente nuevamente.');
                }
                this.updating = false;
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
        this.loading = true;
        this.placesService.deleteFlyer(this.place.id)
            .then(async success => {
                if (success.passed) {
                    await this.storage.setBusinessVerifiedByUser(success.response);
                    this.intentProvider.updateMyBusiness = true;
                    this.toast.messageSuccessWithoutTabs('Su volante ha sido eliminado con exito');
                    this.router.navigateByUrl('app/tab/my-business');
                } else {
                    this.toast.messageErrorWithoutTabs('El volante no ha podido eliminarse, intente de nuevo.');
                }
                this.loading = false;
            });
    }

    trackByIdx(index: number, obj: any): any {
        return index;
    }

}
