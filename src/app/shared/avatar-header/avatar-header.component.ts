import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../core/api/users/user';
import { StorageService } from '../../core/storage/storage.service';

@Component({
    selector: 'app-avatar-header',
    templateUrl: './avatar-header.component.html',
    styleUrls: ['./avatar-header.component.scss'],
})
export class AvatarHeaderComponent implements OnInit {

    @Input() addClass = false;
    user: User = {};

    constructor(private storageService: StorageService,) {
    }

    async ngOnInit() {
        this.user = await this.storageService.getPagamiUser();
    }
}
