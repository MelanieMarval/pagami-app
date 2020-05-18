import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';
import { NoImagePipe } from './no-image.pipe';
import { PluralPipe } from './plural.pipe';
import { FilterPlacePipe } from './filter-place.pipe';
import { FilterByNamePipe } from './filter-by-name.pipe';

@NgModule({
    declarations: [
        CapitalizePipe,
        NoImagePipe,
        PluralPipe,
        FilterPlacePipe,
        FilterByNamePipe
    ],
    imports: [],
    exports: [
        CapitalizePipe,
        NoImagePipe,
        PluralPipe,
        FilterPlacePipe,
        FilterByNamePipe
    ],
    providers: []
})
export class PipesModule {
}
