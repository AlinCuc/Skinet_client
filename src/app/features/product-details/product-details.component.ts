import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { CartService } from '../../core/services/cart.service';
import { retry } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatDivider,
    FormsModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private avtivatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  product?: Product;
  qunatityInCart = 0;
  qunatity = 1;

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct() {
    const id = this.avtivatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: (product) => {
        (this.product = product), this.updateQunatityInCart();
      },
      error: (error) => console.log(error),
    });
  }
  updateCart() {
    if (!this.product) return;
    if (this.qunatity > this.qunatityInCart) {
      const itemToAdd = this.qunatity - this.qunatityInCart;
      this.qunatityInCart += itemToAdd;
      this.cartService.addItemToCart(this.product, itemToAdd);
    } else {
      const itemToRemove = this.qunatityInCart - this.qunatity;
      this.qunatityInCart -= itemToRemove;
      this.cartService.removeItemFromCart(this.product.id, itemToRemove);
    }
  }
  updateQunatityInCart() {
    this.qunatityInCart =
      this.cartService
        .cart()
        ?.items.find((x) => x.productId === this.product?.id)?.quantity || 0;
    this.qunatity = this.qunatityInCart || 1;
  }
  getButtonInText() {
    return this.qunatityInCart > 0 ? 'UpdateCart' : 'Add to cart';
  }
  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }
}
