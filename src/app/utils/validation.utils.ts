import { WeedDayHours } from '../core/api/places/weed-day-hours';

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

    // For BusinessHours

    static validateDay(hours: any): boolean {
        let hourTo: any;
        let hourFrom: any;
        hourTo = hours.to.split(':')[0];
        hourFrom = hours.from.split(':')[0];
        return Number(hourFrom) < Number(hourTo);
    }

    static validateEmptyHours(day: WeedDayHours): boolean {
        if (day.active) {
            if (!day.hoursOne) {
                return false;
            } else {
                if (!day.hoursOne.to || !day.hoursOne.from) {
                    return false;
                }
                if (day.breakTime) {
                    if (!day.hoursTwo) {
                        return false;
                    } else {
                        if (!day.hoursTwo.to || !day.hoursTwo.from) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

}
