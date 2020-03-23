import { Component, OnInit } from '@angular/core';
import {InputFilePage} from '../parent/InputFilePage';
import { StorageService } from '../../core/storage/storage.service';
import { Place } from '../../core/api/places/place';

@Component({
    selector: 'app-business-details',
    templateUrl: 'business-details.html',
    styleUrls: ['business-details.scss']
})
export class BusinessDetailsPage extends InputFilePage implements OnInit{

    private showWhatsapp = false;
    private place: Place;

    constructor(private storageService: StorageService) {
        super();
    }

    async ngOnInit() {
        this.place = await this.storageService.getPlaceUnregistered();
    }

    saveBusiness() {
        console.log('Quiero guardar esta empresa');
    }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
        this.preview();
    }
}
