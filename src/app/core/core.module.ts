import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MainService } from './main/main.service';
import { PlacesService } from './places/places.service';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        MainService,
        AuthService,
        PlacesService
    ]
})
export class CoreModule { }
