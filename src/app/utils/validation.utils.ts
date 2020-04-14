

export class ValidationUtils {

    static validateEmpty(object, exceptions?: string[]): boolean {
        const names = Object.getOwnPropertyNames(object);
        if (!exceptions || exceptions.length === 0) {
            for (const name of names) {
                if (String(object[name]).trim() === '') {
                    return false;
                }
            }
        } else {
            for (const name of names) {
                for (const exc of exceptions) {
                    if (exc !== name) {
                        if (String(object[name]).trim() === '') {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
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
}
