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

    constructor(private userService: UsersService,
                private intentProvider: AdminIntentProvider,
                private router: Router,
                private toast: ToastProvider,) {
    }

    ngOnInit(): void {
        this.userService.getTotalUsers()
            .then((success: ApiResponse) => {
                if (success.passed) {
                    this.stats = {
                        active: success.response.active,
                        disabled: success.response.disabled,
                        total: success.response.active + success.response.disabled
                    };
                }
            });
        this.getUsers();
    }

    getUsers() {
        this.loading = true;
        this.userService.getAll()
            .then(success => {
                this.loading = false;
                if (success.passed) {
                    this.users = success.response;
                    this.empty = this.users.length === 0;
                } else {
                    this.toast.messageErrorAboveButton('No se ha podido cargar la informacion. Compruebe su conexion a internet', 5000);
                }
            });
    }

    goToProfileUser(user: User) {
        this.intentProvider.userToView = undefined;
        this.intentProvider.userToEdit = user;
        console.log(user);
        this.router.navigate(['admin/tabs/users/profile']);
    }

}
