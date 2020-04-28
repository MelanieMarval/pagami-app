import { Component, OnInit } from '@angular/core';
import { Place } from '../../core/api/places/place';
import { PLACES, CLAIMS } from '../../utils/Const';
import { UserIntentProvider } from '../../providers/user-intent.provider';
import { Router } from '@angular/router';
import { AlertProvider } from '../../providers/alert.provider';


@Component({
    selector: 'app-shop',
    templateUrl: 'shop.html',
    styleUrls: ['shop.scss']
})
export class ShopPage implements OnInit {

    STATUS = PLACES.STATUS;
    claiming = false;
    isClaimed = true;
    place: Place = {
        accuracy: 0,
        createTime: String(new Date()),
        category: {
            name: 'Abasto',
            icon: 'abasto'
        },
        id: 'nkjhniohnil4',
        lastUpdate: '54545',
        latitude: 0,
        location: { address: 'Ubicado en un lugar del mundo'},
        longitude: 0,
        name: 'Una Tienda',
        phone: '04154545445',
        // tslint:disable-next-line:max-line-length
        photoUrl: 'https://firebasestorage.googleapis.com/v0/b/pagami-4dd5e.appspot.com/o/images%2Fplace%2F1iqzzd8jlga?alt=media&token=76c2ffa6-e178-4f58-8247-6b6a2c175340',
        registeredBy: '4654ds56fdf456hdmyew',
        samePhone: false,
        status: this.STATUS.VERIFIED,
        type: 'STORE',
        website: 'tiendita.com.ve',
        whatsapp: '024147848885'
    };
    CLAIMS = CLAIMS.STATUS;

    constructor(private intentProvider: UserIntentProvider,
                private alert: AlertProvider,
                private router: Router) {
    }

    ngOnInit(): void {
        if (this.intentProvider.placeToShow) {
            this.claiming = false;
            this.place = this.intentProvider.placeToShow;
            return;
        }
        if (this.intentProvider.placeToClaim) {
            this.claiming = true;
            // @ts-ignore
            this.place = this.intentProvider.placeToClaim;
            if (!this.place.claim || this.place.claim.status === this.CLAIMS.REJECTED) {
                this.isClaimed = false;
            } else {
                this.intentProvider.placeToClaim = undefined;
                this.isClaimed = true;
            }
        }
    }

}
