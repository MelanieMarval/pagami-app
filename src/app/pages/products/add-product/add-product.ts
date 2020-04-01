import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { InputFilePage } from '../../parent/InputFilePage';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { ValidationUtils } from '../../../utils/validation.utils';
import { PagamiToast } from '../../../toast/pagami.toast';

@Component({
    selector: 'app-add-product',
    templateUrl: 'add-product.html',
    styleUrls: ['add-product.scss']
})
export class AddProductPage extends InputFilePage {

    product = {
        name: '',
        price: 0,
        stock: 0,
    };

    constructor(
        private http: HttpClient,
        private alertController: AlertController,
        private route: Router,
        private toast: PagamiToast,
        protected geolocationService: GeolocationService
    ) {
        super(geolocationService);
    }

    onSubmit() {
        if (!ValidationUtils.validateEmpty(this.product)) {
            this.toast.messageErrorWithoutTabs('Todos los campos deben estar llenos').then();
        }
        // const formData = new FormData();
        // formData.append('file', this.fileData);
        // this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
        //     reportProgress: true,
        //     observe: 'events'
        // })
        //     .subscribe(events => {
        //         if (events.type === HttpEventType.UploadProgress) {
        //             this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        //             console.log(this.fileUploadProgress);
        //         } else if (events.type === HttpEventType.Response) {
        //             this.fileUploadProgress = '';
        //             console.log(events.body);
        //             alert('SUCCESS !!');
        //         }
        //
        //     });

        this.route.navigate(['/app/my-products']).then();
    }

    async confirmDeleteProduct() {
        const alert = await this.alertController.create({
            header: 'Eliminar producto',
            message: 'Esta seguro de que quiere eliminar este producto?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'alert-cancel',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Si, eliminar',
                    cssClass: 'alert-confirm',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ],
            cssClass: 'ion-color-pagami-surface'
        });

        await alert.present();
    }
}
