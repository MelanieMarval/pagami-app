import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/api/users/user';
import { UsersService } from '../../../../core/api/users/users.service';
import { Router } from '@angular/router';
import { IntentProvider } from '../../../../providers/intent.provider';

@Component({
    selector: 'app-admin-users',
    templateUrl: 'users.html',
    styleUrls: ['./users.scss']
})
export class UsersPage implements OnInit {

    users: User[];
    loading = true;

    constructor(private userService: UsersService,
                private intentProvider: IntentProvider,
                private router: Router) {
    }

    ngOnInit(): void {
        this.userService.getAll()
            .then(success => {
                this.loading = false;
                if (success.passed) {
                    this.users = success.response;
                } else {
                }
            });
    }

    goToProfileUser(user: User) {
        this.intentProvider.userToEdit = user;
        console.log(user);
        this.router.navigate(['admin/tabs/users/profile']);
    }
}
