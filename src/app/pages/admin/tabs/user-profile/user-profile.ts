import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { USER } from '../../../../utils/Const';
import { User } from '../../../../core/api/users/user';
import { UsersService } from '../../../../core/api/users/users.service';
import { ToastProvider } from '../../../../providers/toast.provider';
import { AdminIntentProvider } from '../../../../providers/admin-intent.provider';

@Component({
    selector: 'app-admin-user-profile',
    templateUrl: 'user-profile.html',
    styleUrls: ['./user-profile.scss']
})
export class UserProfilePage implements OnInit {

    user: User = {location: {}};
    isView: boolean;
    updating = false;
    TYPE = USER.TYPE;
    STATUS = USER.STATUS;
    messages = {
        type: {},
        status: {}
    };

    constructor(private intentProvider: AdminIntentProvider,
                private alertController: AlertController,
                private toast: ToastProvider,
                private usersService: UsersService) {
    }

    ngOnInit(): void {
        if (this.intentProvider.userToView) {
            this.user = this.intentProvider.userToView;
            this.isView = true;
        } else {
            this.user = this.intentProvider.userToEdit;
            this.isView = false;
            this.setMessagesType();
            this.setMessagesStatus();
        }
    }

    setMessagesType(): void {
        if (this.user.type === this.TYPE.ADMIN) {
            this.messages.type = {
                header: 'Descender a Basico',
                message: 'Esta seguro? Este usuario perdera sus permisos al panel.',
                button: 'Descender',
                value: this.TYPE.NORMAL
            };
        } else {
            this.messages.type = {
                header: 'Ascender a Administrador',
                message: 'Esta seguro? Este usuario tendra permisos para acceder a este panel.',
                button: 'Ascender',
                value: this.TYPE.ADMIN
            };
        }
    }
    setMessagesStatus(): void {
        if (this.user.status === this.STATUS.DISABLED) {
            this.messages.status = {
                header: 'Habilitar Usuario',
                message: 'El usuario podra volver a acceder a su cuenta y registrar empresas.',
                button: 'Habilitar',
                value: this.STATUS.ACTIVE
            };
        } else {
            this.messages.status = {
                header: 'Deshabilitar Usuario',
                message: 'Esta seguro? El usuario ya no podra acceder a su cuenta Pagami, ni registrar empresas.',
                button: 'Deshabilitar',
                value: this.STATUS.DISABLED
            };
        }
    }

    async showAlert(what: string) {
        // @ts-ignore
        const {header, message, button, value } = this.messages[what];
        const alert = await this.alertController.create({
            header, message,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: `Si, ${button}`,
                    handler: () => {
                        this.updating = true;
                        if (what === 'type') {
                            this.changeType();
                        } else {
                            this.changeStatus();
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    private changeStatus() {
        // @ts-ignore
        this.usersService.changeStatus(this.messages.status.value, this.user.id)
            .then(success => {
                this.updating = false;
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('El usuario ha sido actualizado con exito');
                    this.user.status = success.response.status;
                    this.setMessagesStatus();
                } else {
                    this.toast.messageErrorWithoutTabs('No se ha podido actualizar. Intente de nuevo!');
                }
            }).catch(error => {
                this.updating = false;
                this.toast.messageErrorWithoutTabs('No se ha podido actualizar. Intente de nuevo!');
            });
    }

    private changeType() {
        // @ts-ignore
        this.usersService.changeType(this.messages.type.value, this.user.id)
            .then(success => {
                this.updating = false;
                if (success.passed) {
                    this.toast.messageSuccessWithoutTabs('El usuario ha sido actualizado con exito con exito');
                    this.user.type = success.response.type;
                    this.setMessagesType();
                } else {
                    this.toast.messageErrorWithoutTabs('No se ha podido actualizar. Intente de nuevo!');
                }
            }).catch(error => {
                this.updating = false;
                this.toast.messageErrorWithoutTabs('No se ha podido actualizar. Intente de nuevo!');
            });
    }
}
