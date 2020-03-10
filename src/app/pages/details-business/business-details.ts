import {Component} from '@angular/core';
import {InputFilePage} from '../parent/InputFilePage';

@Component({
    selector: 'app-business-details',
    templateUrl: 'business-details.html',
    styleUrls: ['business-details.scss']
})
export class BusinessDetailsPage extends InputFilePage{

    showWhatsapp = false;

    constructor(

    ) {
        super();
    }

    
    saveBusiness() {
        console.log('Quiero guardar esta empresa');
    }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
        this.preview();
    }
}
