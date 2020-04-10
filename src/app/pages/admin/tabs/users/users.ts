import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/api/users/user';
import { UsersService } from '../../../../core/api/users/users.service';

@Component({
    selector: 'app-admin-users',
    templateUrl: 'users.html',
    styleUrls: ['./users.scss']
})
export class UsersPage implements OnInit {

    users: User[];

    constructor(private userService: UsersService) {
    }

    ngOnInit(): void {
        this.userService.getAll()
            .then(success => {
                console.log(success);
                if (success.passed) {
                    this.users = success.response;
                } else {
                }
            });
    }

}
