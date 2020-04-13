import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../core/api/users/user';
import { StorageProvider } from '../../providers/storage.provider';
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
    profileImage: string;

    constructor(private storageService: StorageProvider) {
    }

    async ngOnInit() {
        this.user = await this.storageService.getPagamiUser();
        this.profileImage = this.userThumbnailPhoto(this.user);
    }

    getImage(): string {
        return this.profileImage;
    }

    tryLoadImageLater() {
        this.profileImage = 'assets/img/no-user-image.svg';
        setTimeout(async () => {
            this.profileImage = this.userThumbnailPhoto(this.user);
        }, 15000);
    }
}
