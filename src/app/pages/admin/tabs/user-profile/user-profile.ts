import { Component, OnInit } from '@angular/core';
import { IntentProvider } from '../../../../providers/intent.provider';
import { User } from '../../../../core/api/users/user';

@Component({
    selector: 'app-admin-user-profile',
    templateUrl: 'user-profile.html',
    styleUrls: ['./user-profile.scss']
})
export class UserProfilePage implements OnInit {

    user: User = {location: {}};
    updating = false;

    constructor(private intentProvider: IntentProvider) {
    }

    ngOnInit(): void {
        this.user = this.intentProvider.userToEdit;
        console.log(this.user);
    }
}
