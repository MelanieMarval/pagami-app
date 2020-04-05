import { Component, OnInit } from '@angular/core';
import { InputFilePage } from '../../parent/InputFilePage';
import { ToastController } from '@ionic/angular';
import { GeolocationService } from '../../../core/geolocation/geolocation.service';
import { Place } from '../../../core/api/places/place';
import { ValidationUtils } from '../../../utils/validation.utils';
import { PagamiToast } from '../../../toast/pagami.toast';
import { PlacesService } from '../../../core/api/places/places.service';

@Component({
    selector: 'app-my-business',
    templateUrl: 'my-business.html',
    styleUrls: ['my-business.scss']
})
export class MyBusinessPage extends InputFilePage implements OnInit {

    isRegister = false;
    isEditing = false;
    updating = false;
    place: Place = {latitude: 0, longitude: 0};

    constructor(
        private toast: PagamiToast,
        private placesService: PlacesService,
        protected geolocationService: GeolocationService
    ) {
        super(geolocationService);
    }

    ngOnInit() {
        this.place = {
            latitude: 48489,
            longitude: 4548946,
            accuracy: 4544,
            registeredBy: '',
            photoUrl: 'assets/img/avatar-business.jpg',
            name: 'Tiendas D1',
            icon: '015-store',
            location: 'Calle 30 & Autopista Sur, Itagüi, Antioquia',
            phone: '+574104804289',
            whatsapp: '+573104804289',
            website: 'adidas.com.co',
            type: 'STORE'
        };
        this.previewUrl = this.place.photoUrl;
    }

    editBusiness() {
        this.isEditing = !this.isEditing;
    }

    setPlace(place) {
        console.log('-> place', place);
        this.place.location = place;
        this.places = [];
    }

    async saveBusiness() {
        if (!ValidationUtils.validateEmpty(this.place, ['registeredBy'])) {
            await this.toast.messageErrorAboveButton('Todos los campos deben estar llenos para poder guardar');
            return;
        }
        if (!ValidationUtils.validatePhone(this.place.phone)) {
            await this.toast.messageErrorAboveButton('Su número de teléfono debe contener entre 8 y 15 digitos');
            return;
        }
        console.log(this.place);
        this.updating = true;
        // this.placesService.update(this.place)
        //     .then(async success => {
        //         if (success.passed === true) {
        //             console.log('-> success.response', success.response);
        //             this.isEditing = false;
        //             this.updating = false;
        //             await this.toast.messageSuccessWithoutTabs('Su empresa ha sido actulizada exitosamente!');
        //         } else {
        //             this.updating = false;
        //             await this.toast.messageErrorWithoutTabs('No se han podido actualizar su informacion. Intente de nuevo!');
        //         }
        //     });
    }

}
