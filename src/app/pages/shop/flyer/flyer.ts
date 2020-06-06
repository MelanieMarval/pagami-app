import { Component, OnInit } from '@angular/core';
import { UserIntentProvider } from '../../../providers/user-intent.provider';
import { Place } from '../../../core/api/places/place';
import { Flyer } from '../../../core/api/places/flyer';

@Component({
    selector: 'page-flyer',
    templateUrl: 'flyer.html',
    styleUrls: ['./flyer.scss'],
})

export class FlyerPage implements OnInit {

    loading: any;
    shop: Place;
    flyer: Flyer = {};

    constructor(private intentProvider: UserIntentProvider) {
    }

    async ngOnInit() {
        this.flyer = {
            title: 'Pizzeria El Boxeador "Yornel Marval Guzman"',
            photoUrl: 'assets/img/flyer-pizza.jpg',
            textList: ['Comida Rapida', 'Restaurante', 'Pizza', 'Salsa', 'Queso', 'Pizzeria', 'Ingrediente']
        };
        this.shop = this.intentProvider.placeToShow;
    }

}
