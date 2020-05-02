import { Plugins } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { ToastProvider } from './toast.provider';
const { Browser } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class BrowserProvider {

    constructor(private toastProvider: ToastProvider) { }

    open(url: string) {
        Browser.open({ url })
            .catch(() => this.toastProvider.messageErrorWithoutTabs('Esta pagina web es incorrecta'));
    }

    openWhatsapp(number: string) {
        Browser.open({ url: `https://api.whatsapp.com/send?phone=${number}` })
            .catch(() => this.toastProvider.messageErrorWithoutTabs('No se puede abrir whatsapp'));
    }

}
