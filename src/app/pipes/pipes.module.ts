import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { NoImagePipe } from './no-image.pipe';
import { PluralPipe } from './plural.pipe';
import { FilterPlacePipe } from './filter-place.pipe';

@NgModule({
    declarations: [CapitalizePipe, NoImagePipe, PluralPipe, FilterPlacePipe],
    imports: [],
    exports: [
        CapitalizePipe,
        NoImagePipe,
        PluralPipe,
        FilterPlacePipe
    ],
    providers: []
})
export class PipesModule {
}
