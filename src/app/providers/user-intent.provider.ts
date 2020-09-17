import { Injectable } from '@angular/core';
import { Place } from '../core/api/places/place';
import { PagamiGeo } from '../core/geolocation/pagami.geo';
import { Product } from '../core/api/products/product';
import { Service } from '../core/api/services/service';


@Injectable({
    providedIn: 'root'
})
export class UserIntentProvider {

    private _placeToEdit: Place;
    private _placeEdited: Place;
    private _placeToShow: Place;
    private _placeToClaim: Place;
    private _placeToChangeLocation: Place;
    private _showingPlaceDetails = false;
    private _lastUpdatedPoint: PagamiGeo;
    private _myBusinessDetails: any; // contain id and name
    private _updateMyBusiness = false;

    get placeToEdit(): Place {
        return this._placeToEdit;
    }

    set placeToEdit(value: Place) {
        this._placeToEdit = value;
    }

    get placeEdited(): Place {
        return this._placeEdited;
    }

    set placeEdited(value: Place) {
        this._placeEdited = value;
    }

    get placeToShow(): Place {
        return this._placeToShow;
    }

    set placeToShow(value: Place) {
        this._placeToShow = value;
    }

    get placeToClaim(): Place {
        return this._placeToClaim;
    }

    set placeToClaim(value: Place) {
        this._placeToClaim = value;
    }

    get showingPlaceDetails(): boolean {
        return this._showingPlaceDetails;
    }

    set showingPlaceDetails(value: boolean) {
        this._showingPlaceDetails = value;
    }

    get lastUpdatedPoint(): PagamiGeo {
        return this._lastUpdatedPoint;
    }

    set lastUpdatedPoint(value: PagamiGeo) {
        this._lastUpdatedPoint = value;
    }

    get updateMyBusiness(): boolean {
        return this._updateMyBusiness;
    }

    set updateMyBusiness(value: boolean) {
        this._updateMyBusiness = value;
    }

    get placeToChangeLocation(): Place {
        return this._placeToChangeLocation;
    }

    set placeToChangeLocation(value: Place) {
        this._placeToChangeLocation = value;
    }


    get myBusinessDetails(): any {
        return this._myBusinessDetails;
    }

    set myBusinessDetails(value: any) {
        this._myBusinessDetails = value;
    }


    // Products
    private _productToEdit: Product;
    private _productEdited: Product;
    private _productDeleted: Product;
    private _reloadProducts = false;

    get productToEdit(): Product {
        return this._productToEdit;
    }

    set productToEdit(value: Product) {
        this._productToEdit = value;
    }

    get productEdited(): Product {
        return this._productEdited;
    }

    set productEdited(value: Product) {
        this._productEdited = value;
    }

    get productDeleted(): Product {
        return this._productDeleted;
    }

    set productDeleted(value: Product) {
        this._productDeleted = value;
    }

    get reloadProducts(): boolean {
        return this._reloadProducts;
    }

    set reloadProducts(value: boolean) {
        this._reloadProducts = value;
    }

    // Services
    private _serviceToEdit: Service;
    private _serviceToEdited: Service;
    private _serviceDeleted: Service;
    private _reloadServices = false;

    get serviceToEdit(): Service {
        return this._serviceToEdit;
    }

    set serviceToEdit(value: Service) {
        this._serviceToEdit = value;
    }

    get serviceEdited(): Service {
        return this._serviceToEdited;
    }

    set serviceEdited(value: Service) {
        this._serviceToEdited = value;
    }

    get serviceDeleted(): Service {
        return this._serviceDeleted;
    }

    set serviceDeleted(value: Service) {
        this._serviceDeleted = value;
    }

    get reloadServices(): boolean {
        return this._reloadServices;
    }

    set reloadServices(value: boolean) {
        this._reloadServices = value;
    }
}
