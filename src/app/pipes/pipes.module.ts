import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { NoImagePipe } from './no-image.pipe';
import { PluralPipe } from './plural.pipe';

@NgModule({
    declarations: [CapitalizePipe, NoImagePipe, PluralPipe],
    imports: [],
    exports: [
        CapitalizePipe,
        NoImagePipe,
        PluralPipe
    ],
    providers: []
})
export class PipesModule {
}
