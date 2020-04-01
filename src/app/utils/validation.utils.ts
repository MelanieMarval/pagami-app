

export class ValidationUtils {

    static validateEmpty(object, exceptions?: string[]): boolean {
        console.log(object);
        const names = Object.getOwnPropertyNames(object);
        if (!exceptions || exceptions.length === 0) {
            for (const name of names) {
                console.log(name, object[name]);
                if (String(object[name]).trim() === '') {
                    return false;
                }
            }
        } else {
            for (const name of names) {
                console.log(name, object[name]);
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
}
