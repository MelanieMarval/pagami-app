import { Injectable } from '@angular/core';
// @ts-ignore
import imageCompression from 'browser-image-compression';

@Injectable({
    providedIn: 'root'
})
export class CompressImageProvider {

    constructor() {
    }

    static async handleImageUpload(event) {
        const imageFile = event.target.files[0];
        const options = {
            maxSizeMB: 0.100,
            maxWidthOrHeight: 1020,
            onProgress: undefined,
        };
        try {
            return await imageCompression(imageFile, options);
        } catch (error) {
            console.log(error);
        }

    }

    static async handleImageUploadFile(image: string, name: string) {
        const imageFile = await imageCompression.getFilefromDataUrl(image, name);
        const options = {
            maxSizeMB: 0.100,
            maxWidthOrHeight: 1020,
            onProgress: undefined,
        };
        try {
            return await imageCompression(imageFile, options);
        } catch (error) {
            console.log(error);
        }

    }

}

