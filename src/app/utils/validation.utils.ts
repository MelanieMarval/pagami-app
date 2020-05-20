

export class ValidationUtils {

    static validateEmpty(object, exceptions?: string[]): boolean {
        const names = Object.getOwnPropertyNames(object);
        return !names.find(name => {
            const value = String(object[name]).trim();
            return value === '' && exceptions && !exceptions.find(nameE => nameE === name);
        });
    }

    static validatePhone(phone): boolean {
        return !(phone.trim() === '' || phone.length < 8 || phone.length > 15);
    }

    static validateUrl(url): any {
        if (url.pristine) {
            return null;
        }
        // tslint:disable-next-line:max-line-length
        const URL_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        return !URL_REGEXP.test(url.value);
    }

    static validateImage(event: any) {
        const file = event.target.files[0].name.split('.');
        const extension = file.slice(-1)[0];
        return extension === 'png' || extension === 'jpg' || extension === 'jpeg';
    }
}
