import { Component, OnInit } from '@angular/core';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
import { Place } from '../../../core/api/places/place';

@Component({
    selector: 'page-flyer',
    templateUrl: 'flyer.html',
    styleUrls: ['./flyer.scss'],
})

export class FlyerPage implements OnInit {

    loading: any;
    shop: Place;
    flyer: any = {};

    constructor(private intentProvider: UserIntentProvider) {
    }

    async ngOnInit() {
        this.flyer = {
            id: 'dasidsagdyua',
            photoUrl: 'assets/img/flyer-pizza.jpg',
            words: ['Comida Rapida', 'Restaurante', 'Pizza', 'Salsa', 'Queso', 'Pizzeria', 'Ingrediente']
        };
        this.shop = this.intentProvider.placeToShow;
    }

    trackByIdx(index: number, obj: any): any {
        return index;
    }

}
