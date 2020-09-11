import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {ProductsPageRoutingModule} from './services-routing.module';

import {ServicePage} from './services';
import {AddServicePage} from './add-service/add-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule,
        ProductsPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ],
    declarations: [
        ServicePage,
        AddServicePage
    ]
})
export class ServicesModule {
}
