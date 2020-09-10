import { Component, Input, OnInit } from '@angular/core';
import { ToastProvider } from '../../../../../providers/toast.provider';
import { PlansService } from '../../../../../core/api/plans/plans.service';
import { Plan } from '../../../../../core/api/plans/plan';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { InputFilePage } from '../../../../parent/InputFilePage';
import { GeolocationService } from '../../../../../core/geolocation/geolocation.service';
import { ValidationUtils } from '../../../../../utils/validation.utils';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';

const {Device} = Plugins;
import { FireStorage } from '../../../../../core/fire-storage/fire.storage';
import { Payment } from '../../../../../core/api/payments/Payment';
import { MethodPayment } from '../../../../../core/api/payments/MethodPayment';
import { PaymentsService } from '../../../../../core/api/payments/payments.service';

@Component({
    selector: 'page-transfer',
    templateUrl: 'transfer.html',
    styleUrls: ['./transfer.scss'],
})

export class TransferPage extends InputFilePage implements OnInit {

    @Input() planSelected: Plan;
    @Input() methodSelected: MethodPayment;
    @Input() placeId: string;
    payment: Payment;
    loading = false;
    showForm = false;
    isTest = false;

    constructor(private toast: ToastProvider,
                private modalController: ModalController,
                private paymentsService: PaymentsService,
                private router: Router,
                private alertController: AlertController,
                private clipboard: Clipboard,
                private actionSheetController: ActionSheetController,
                private fireStorage: FireStorage,
                protected geolocationService: GeolocationService) {
        super(geolocationService);
    }

    async ngOnInit() {
        const info = await Device.getInfo();
        this.isTest = info.platform === 'web';
        this.payment = {
            type: this.methodSelected.id,
            planId: this.planSelected.id,
            placeId: this.placeId,
        };
    }

    closeModal() {
        const data = {};
        this.modalController.dismiss(data);
    }

    async validateMyPaymentPlan() {
        const alert = await this.alertController.create({
            header: '¿Estás seguro de haber realizado la transferencia?',
            message: 'Sólo debes rellenar y enviar este formulario cuando tu transferencia haya sido realizada',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Sí, la realice',
                    handler: () => {
                        if (this.payment.photo) {
                            this.saveImage();
                            console.log(this.payment);
                        } else {
                            this.toast.messageDefault('Necesita abjuntar la foto de la transferencia');
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    copyClipboard(numberAccount: string) {
        this.clipboard.copy(numberAccount).then(() =>
            this.toast.messageDefault('Numero de cuenta copiado en el portapapeles')
        );
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
        this.payment.photo = image.dataUrl;

        await this.chargeImage(this.isTest, image.dataUrl);
    }

    addPhoto(event: any) {
        if (!ValidationUtils.validateImage(event)) {
            this.toast.messageErrorWithoutTabs('Formato de imágen no válido, por favor seleccione otra.', 3000);
            return;
        }
        this.payment.photo = event.target.files[0].name;
        this.chargeImage(true, event);
    }

    async saveImage() {
        this.loading = true;
        const success = await this.fireStorage.savePaymentPhotoImage(this.fileData);
        if (success) {
            this.payment.photo = success;
            this.savePayment();
        } else {
            this.toast.messageErrorWithoutTabs('No se ha podido guardar su imagen. Intente de nuevo!');
            this.loading = false;
        }
    }

    savePayment() {
        this.loading = true;
        this.paymentsService.save(this.payment)
            .then(success => {
                this.loading = false;
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('Su pago ha sido registrado, espere mientras es verificado');
                    this.router.navigateByUrl('/app/tabs/my-business');
                    this.closeModal();
                } else {
                    this.toast.messageErrorWithoutTabs('No se ha podido registrar su pago. Intente de nuevo!');
                }
            }, error => {
                this.loading = false;
                this.toast.messageErrorWithoutTabs('No se ha podido registrar su pago. Intente de nuevo!');
            });
    }

}

