import { Component, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../providers/toast.provider';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { GeolocationService } from '../../../../core/geolocation/geolocation.service';
import { InputFilePage } from '../../../parent/InputFilePage';
import { CameraResultType, CameraSource, Device, Plugins } from '@capacitor/core';

@Component({
    selector: 'page-flyer',
    templateUrl: 'flyer.html',
    styleUrls: ['./flyer.scss'],
})

export class FlyerPage extends InputFilePage implements OnInit {

    loading: any;
    isHiddenAddButton = false;
    updating: boolean;
    private isTest: boolean;
    flyer: any = {
        words: [''],
        title: ''
    };

    constructor(private toast: ToastProvider,
                private actionSheetController: ActionSheetController,
                private alertController: AlertController,
                protected geolocationService: GeolocationService) {
        super(geolocationService);
    }

    async ngOnInit() {
        const info = await Device.getInfo();
        console.log(info);
        this.isTest = info.platform === 'web';
    }

    addWord() {
        // esto es un por si a las...
        if (this.flyer.words.length >= 8) {
            this.isHiddenAddButton = true;
            return this.toast.messageDefault('El maximo es de 8, recuerde guardar antes de salir', 'bottom');
        }
        this.flyer.words.push('');
        if (this.flyer.words.length === 8) {
            this.isHiddenAddButton = true;
        }
    }


    deleteWord(i: number) {
        this.flyer.words.splice(i, 1);
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

        await this.chargeImageFile(image.dataUrl);
    }

    saveFlyer() {
        for (const word of this.flyer.words) {
            if (word.trim().length <= 1) {
                return this.toast.messageErrorWithoutTabs('Debe rellenar todos los campos o eliminar el no deseado');
            }
            if (word.trim().length > 36) {
                return this.toast.messageErrorWithoutTabs('Las palabras no pueden exceder los 36 caracteres');
            }
        }
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
