import { Component, OnInit } from '@angular/core';
import { Place } from '../../core/api/places/place';
import { PLACES } from '../../utils/Const';
import { IntentProvider } from '../../providers/intent.provider';
import { Router } from '@angular/router';


@Component({
    selector: 'app-shop',
    templateUrl: 'shop.html',
    styleUrls: ['shop.scss']
})
export class ShopPage implements OnInit {

    STATUS = PLACES.STATUS;
    claim = false;
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

    constructor(private intentProvider: IntentProvider,
                private router: Router) {
    }

    ngOnInit(): void {
        if (this.intentProvider.placeToShow) {
            this.claim = false;
            this.place = this.intentProvider.placeToShow;
            return;
        }
        if (this.intentProvider.placeToClaim) {
            this.claim = true;
            this.place = this.intentProvider.placeToClaim;
            return;
        }
    }

}
