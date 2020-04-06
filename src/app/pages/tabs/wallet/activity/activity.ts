import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../../../core/api/places/places.service';
import { PagamiToast } from '../../../../toast/pagami.toast';
import { Place } from '../../../../core/api/places/place';
import { StorageService } from '../../../../core/storage/storage.service';
import { ResolveEnd, Router } from '@angular/router';
import { PLACES } from '../../../../utils/Const';
import { StorageInstance } from '../../../../providers/storage.instance';

@Component({
    selector: 'app-activity',
    templateUrl: 'activity.html',
    styleUrls: ['../wallet.scss']
})
export class ActivityPage implements OnInit {

    loading = true;
    error = false;
    registers: Place[];
    STATUS = PLACES.STATUS;
    indexOfPlaceToEdit: number = undefined;

    constructor(private placesService: PlacesService,
                private storageService: StorageService,
                private router: Router,
                private toast: PagamiToast,
                private storageInstance: StorageInstance) {
    }

    ngOnInit(): void {
        this.router.events.subscribe(next => {
            if (next instanceof ResolveEnd) {
                this.setPlaceEdited();
            }
        });
        console.log('onInit called');
        this.placesService.myRegisters()
            .then(async success => {
                if (success.passed) {
                    this.registers = await success.response.filter(place => place.status);
                    this.loading = false;
                    this.error = false;
                }
            })
            .catch(error => {
                this.toast.messageErrorWithoutTabs('Su información no aparece, intente recargando.', 4000, 'Hemos tenido problemas!');
                this.loading = false;
                this.error = true;
            });
    }

    setPlaceEdited() {
        if (this.storageInstance.placeEdited && this.indexOfPlaceToEdit) {
            this.registers[this.indexOfPlaceToEdit] = this.storageInstance.placeEdited;
            this.storageInstance.placeEdited = undefined;
            this.indexOfPlaceToEdit = undefined;
        }
    }

    messageStatus(status: string): string {
        switch (status) {
            case this.STATUS.WAITING:
                return 'En espera de aceptacion';
            case this.STATUS.ACCEPTED:
                return 'En espera de verificacion';
            case this.STATUS.VERIFIED:
                return 'Verificado';
            case this.STATUS.REJECTED:
                return 'Rechazado';
            case this.STATUS.INCOMPLETE:
                return 'Incompleto';
            default:
                return 'Desabilitado';
        }
    }

    async navigateToBusinessDetails(register: Place) {
        this.indexOfPlaceToEdit = this.registers.indexOf(register);
        this.storageInstance.placeToEdit = Object.assign({}, register);
        await this.router.navigate(['/app/business-details']);
    }

    getPhoto(register: Place) {
        if (register.status === 'INCOMPLETE') {
            return undefined;
        } else {
            const arrayPhoto = register.photoUrl.split('?');
            return `${arrayPhoto[0]}_64x64?${arrayPhoto[1]}`;
        }
    }
}
