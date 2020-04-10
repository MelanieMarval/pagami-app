import { Component } from '@angular/core';
import { User } from '../../../../core/api/users/user';

@Component({
    selector: 'app-admin-users',
    templateUrl: 'users.html',
    styleUrls: ['./users.scss']
})
export class UsersPage {

    users: User[];

    constructor() {
    }

}
