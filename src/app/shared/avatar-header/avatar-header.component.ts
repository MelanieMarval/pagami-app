import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../core/api/users/user';
import { StorageProvider } from '../../providers/storage.provider';
import { Utils } from 'tslint';
import { UserUtils } from '../../utils/user.utils';

@Component({
    selector: 'app-avatar-header',
    templateUrl: './avatar-header.component.html',
    styleUrls: ['./avatar-header.component.scss'],
})
export class AvatarHeaderComponent implements OnInit {

    @Input() addClass = false;
    user: User = {};
    userThumbnailPhoto = UserUtils.getThumbnailPhoto;

    constructor(private storageService: StorageProvider) {
    }

    async ngOnInit() {
        this.user = await this.storageService.getPagamiUser();
    }
}
