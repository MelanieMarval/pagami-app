import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../../../core/api/places/places.service';
import { PagamiToast } from '../../../../toast/pagami.toast';
import { Place } from '../../../../core/api/places/place';
import { StorageService } from '../../../../core/storage/storage.service';
import { Router } from '@angular/router';
import { PLACES } from '../../../../utils/Const';

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
    date = new Date();

    constructor(private placesService: PlacesService,
                private storageService: StorageService,
                private router: Router,
                private toast: PagamiToast) {
    }

    ngOnInit(): void {
        this.placesService.myRegisters()
            .then(async success => {
                if (success.passed) {
                    console.log(success.response);
                    this.registers = await success.response.filter(place => place.status);
                    console.log(this.registers);
                    setTimeout(time => {
                        this.loading = false;
                        this.error = false;
                    }, 1000);
                }
            })
            .catch(error => {
                this.toast.messageErrorWithoutTabs('Su información no aparece, intente recargando.', 4000, 'Hemos tenido problemas!');
                this.loading = false;
                this.error = true;
            });
    }
    messageStatus(status: string): string {
        switch (status) {
            case this.STATUS.WAITING:
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
        await this.storageService.setPlaceUnregistered(register);
        await this.router.navigate(['/app/business-details', register.id]);
    }

}
