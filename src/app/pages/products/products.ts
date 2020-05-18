import { Component, OnInit } from '@angular/core';
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
export class ProductsPage implements OnInit {

    products: Product[] = [];
    loading = false;

    constructor(private alertController: AlertController,
                private router: Router,
                private toast: ToastProvider,
                private intentProvider: UserIntentProvider,
                private productsService: ProductsService) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.productsService.getByPlaceId(this.intentProvider.myBusinessId)
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
        this.intentProvider.productToEdit = product;
        this.router.navigateByUrl('/app/my/products/edit-product');
    }
}
