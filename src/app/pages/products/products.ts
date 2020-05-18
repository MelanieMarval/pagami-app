import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductsService } from '../../core/api/products/products.service';
import { UserIntentProvider } from '../../providers/user-intent.provider';
import { Product } from '../../core/api/products/product';
import { ToastProvider } from '../../providers/toast.provider';
import { Router } from '@angular/router';

@Component({
    selector: 'app-products',
    templateUrl: 'products.html',
    styleUrls: ['products.scss']
})
export class ProductsPage implements OnInit, AfterViewChecked {

    products: Product[] = [];
    loading = false;
    textSearch = '';

    constructor(private alertController: AlertController,
                private router: Router,
                private toast: ToastProvider,
                private intentProvider: UserIntentProvider,
                private cdRef: ChangeDetectorRef,
                private productsService: ProductsService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.chargeProducts();
    }

    ngAfterViewChecked(): void {
        if (this.intentProvider.productEdited) {
            const idx = this.products.findIndex(product => product.id === this.intentProvider.productEdited.id);
            this.products[idx] = this.intentProvider.productEdited;
            this.intentProvider.productEdited = undefined;
        }
        if (this.intentProvider.productDeleted) {
            const idx = this.products.findIndex(product => product.id === this.intentProvider.productDeleted.id);
            this.products.splice(idx, 1);
            this.intentProvider.productDeleted = undefined;
        }
        if (this.intentProvider.reloadProducts) {
            this.intentProvider.reloadProducts = false;
            this.chargeProducts();
            this.cdRef.detectChanges();
        }
    }

    chargeProducts() {
        this.loading = true;
        this.productsService.getByPlaceId(this.intentProvider.myBusinessDetails.id)
            .then(success => {
                if (success.passed) {
                    this.products = success.response;
                    this.loading = false;
                } else {
                    this.toast.messageErrorWithoutTabs('No hemos podido cargar sus productos, compruebe su conexion');
                    this.loading = false;
                }
            }).catch(error => {
            this.toast.messageErrorWithoutTabs('No hemos podido cargar sus productos, compruebe su conexion');
            this.loading = false;
        });
    }


    openProduct(product: Product) {
        this.intentProvider.productToEdit = Object.assign({}, product);
        this.router.navigateByUrl('/app/my-products/product/edit');
    }
}
