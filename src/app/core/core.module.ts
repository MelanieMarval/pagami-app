import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MainService } from './main/main.service';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        MainService,
        AuthService,
    ]
})
export class CoreModule { }
