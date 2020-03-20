export class InputFilePage {

    protected fileData: any;
    protected previewUrl: string | ArrayBuffer;

    constructor( ) { }

    preview() {
        // Show preview
        // tslint:disable-next-line:prefer-const
        let mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        // tslint:disable-next-line:variable-name
        reader.onload = (_event) => {
            this.previewUrl = reader.result;
        };

    }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
        this.preview();
    }
}
