import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { USER } from '../../../../utils/Const';
import { User, UserStats } from '../../../../core/api/users/user';
import { UsersService } from '../../../../core/api/users/users.service';
// Providers
import { ToastProvider } from '../../../../providers/toast.provider';
import { AdminIntentProvider } from '../../../../providers/admin-intent.provider';
import { ApiResponse } from '../../../../core/api/api.response';
import { UserUtils } from '../../../../utils/user.utils';

@Component({
    selector: 'app-admin-users',
    templateUrl: 'users.html',
    styleUrls: ['./users.scss']
})
export class UsersPage implements OnInit {

    loading = true;
    empty = false;
    users: User[];
    stats: UserStats;
    status = USER.STATUS;
    reloading = false;

    constructor(private userService: UsersService,
                private intentProvider: AdminIntentProvider,
                private router: Router,
                private toast: ToastProvider,) {
    }

    ngOnInit(): void {
        this.load();
    }

    async load() {
        this.loading = true;
        await this.getStats();
        await this.getUsers();
    }

    async reload() {
        this.reloading = true;
        await this.getStats();
        await this.getUsers();
    }

    private async getStats() {
        await this.userService.getTotalUsers()
            .then((success: ApiResponse) => {
                if (success.passed) {
                    this.stats = {
                        active: success.response.active,
                        disabled: success.response.disabled,
                        total: success.response.active + success.response.disabled
                    };
                }
            });
    }

    private async getUsers() {
        await this.userService.getAll()
            .then(success => {
                if (success.passed) {
                    this.users = success.response;
                    this.empty = this.users.length === 0;
                } else {
                    this.toast.messageErrorAboveButton('No se ha podido cargar la informacion. Compruebe su conexion a internet', 5000);
                }
                this.loading = false;
                this.reloading = false;
            });
    }

    goToProfileUser(user: User) {
        this.intentProvider.userToView = undefined;
        this.intentProvider.userToEdit = user;
        this.router.navigate(['admin/tabs/users/profile']);
    }

}
