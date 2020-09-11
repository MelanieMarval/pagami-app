import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Providers
import { ToastProvider } from '../../../providers/toast.provider';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
import { AlertProvider } from '../../../providers/alert.provider';
import { StorageProvider } from '../../../providers/storage.provider';
// Services
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { PlacesService } from '../../../core/api/places/places.service';
import { ClaimService } from '../../../core/api/claim/claim.service';
import { Claim } from '../../../core/api/claim/claim';
import { Place } from '../../../core/api/places/place';

import { InputFilePage } from '../../parent/InputFilePage';
import { ValidationUtils } from '../../../utils/validation.utils';
import { FireStorage } from '../../../core/fire-storage/fire.storage';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { PaymentsService } from '../../../core/api/payments/payments.service';

const {Device} = Plugins;

@Component({
    selector: 'app-my-business',
    templateUrl: 'my-business.html',
    styleUrls: ['my-business.scss']
})
export class MyBusinessPage extends InputFilePage implements OnInit, AfterViewChecked {

    isRegister = false;
    availableToClaim = false;
    isClaim = false;
    isEditing = false;
    isSearching = false;
    isTest = false;
    haveFlyer: any;
    updating = false;
    loading = true;
    place: Place = {latitude: 0, longitude: 0};
    claim: Claim;
    paymentPending: boolean;

    constructor(private router: Router,
                private toast: ToastProvider,
                private alert: AlertProvider,
                private intentProvider: UserIntentProvider,
                private claimService: ClaimService,
                private placesService: PlacesService,
                private fireStorage: FireStorage,
                private paymentsService: PaymentsService,
                private storageService: StorageProvider,
                protected geolocationService: GeolocationService,
                private actionSheetController: ActionSheetController) {
        super(geolocationService);
    }

    async ngOnInit() {
        await this.loadInfo();
        const info = await Device.getInfo();
        this.isTest = info.platform === 'web';
    }

    async loadInfo() {
        this.intentProvider.placeToChangeLocation = undefined;
        const myBusiness = await this.storageService.getBusinessVerifiedByUser();
        console.log('-> myBusiness', myBusiness);
        if (myBusiness) {
            this.loading = false;
            this.setupBusiness(myBusiness);
        }
        this.getMyBusiness();
    }

    async setupBusiness(myBusiness) {
        this.isRegister = true;
        this.place = myBusiness;
        this.intentProvider.myBusinessDetails = {
            id: myBusiness.id,
            name: myBusiness.name,
            acronym: myBusiness.location.acronym,
            plan: myBusiness.plan
        };
        this.previewUrl = this.place.photoUrl;
        this.haveFlyer = !!this.place.flyer;
        this.getIsPaymentPending();
        if (!this.place.dialCode) {
            this.place.dialCode = await this.placesService.getDialCode(this.place.location.acronym);
        }
    }

    getIsPaymentPending() {
        this.paymentsService.getPendingById(this.place.id)
            .then(success => {
                console.log('-> success', success);
                if (success.passed) {
                    this.paymentPending = success.response && success.response.status === 'PENDING';
                } else {
                    this.toast.messageErrorWithoutTabs('Estamos teniendo problemas verificando si tiene pagos pendientes. Intente recangando');
                }
            }, error => {
                this.toast.messageErrorWithoutTabs('Estamos teniendo problemas verificando si tiene pagos pendientes. Intente recangando');
            });
    }

    async ngAfterViewChecked() {
        if (this.intentProvider.placeToChangeLocation || (!this.intentProvider.placeToClaim && this.isSearching)) {
            this.isSearching = false;
            this.ngOnInit();
        }
        if (this.intentProvider.updateMyBusiness) {
            this.loadInfo();
            this.intentProvider.updateMyBusiness = false;
            console.log('-> here');
        }
    }

    getMyBusiness() {
        this.claimService.getMyBusiness()
            .then(async success => {
                if (success.passed) {
                    this.loading = false;
                    if (success.response.status === 'WAITING') {
                        this.isClaim = true;
                        this.claim = success.response;
                    } else {
                        await this.storageService.setBusinessVerifiedByUser(success.response.place);
                        await this.setupBusiness(success.response.place);
                    }
                } else {
                    this.isClaim = false;
                    if (success.code === 71) {
                        this.availableToClaim = true;
                    }
                    this.loading = false;
                }
            }, error => {
                this.loading = false;
                this.toast.messageErrorWithoutTabs('Estamos teniendo problemas al procesar su solicitud. Intente mas tarde');
            });
    }

    validateBusiness() {
        console.log(this.place);
        if (!ValidationUtils.validateEmpty(this.place, ['website', 'whatsapp'])) {
            this.toast.messageErrorAboveButton('Todos los campos deben estar llenos para poder guardar');
            return;
        }
        if (!ValidationUtils.validatePhone(this.place.phone)) {
            this.toast.messageErrorAboveButton('Su número de teléfono debe contener entre 8 y 15 digitos');
            return;
        }
        if (this.previewUrl !== this.place.photoUrl) {
            this.saveImage();
        } else {
            this.saveBusiness();
        }
    }

    async saveImage() {
        this.updating = true;
        const success = await this.fireStorage.saveBusinessImage(this.fileData);
        if (success) {
            this.place.photoUrl = success;
            this.previewUrl = success;
            this.saveBusiness();
        } else {
            this.toast.messageErrorWithoutTabs('No se ha podido guardar su imagen. Intente de nuevo!');
            this.updating = false;
        }
    }

    saveBusiness() {
        this.updating = true;
        this.placesService.update(this.place)
            .then(success => {
                if (success.passed === true) {
                    this.storageService.setBusinessVerifiedByUser(success.response);
                    this.isEditing = false;
                    this.updating = false;
                    this.toast.messageSuccessWithoutTabs('Su empresa ha sido actualizada exitosamente!');
                } else {
                    this.updating = false;
                    this.toast.messageErrorWithoutTabs('Puede que este experimentando problemas de conexión. Intente de nuevo!');
                }
            }).catch(error => {
            this.updating = false;
            this.toast.messageErrorWithoutTabs('Estamos teniendo problemas al procesar su solicitud. Intente mas tarde');
        });
    }

    searchBusiness() {
        this.toast.messageInfoForMap('Busca tu empresa en el mapa y seleccionala para continuar');
        this.isSearching = true;
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

    async viewFlyer() {
        this.intentProvider.placeToShow = this.place;
        await this.router.navigate(['/app/shop/flyer']);
    }
}
