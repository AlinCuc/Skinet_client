import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import {
  MatCardActions,
  MatCardContent,
  MatCardModule,
} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-item',
  imports: [
    MatCardModule,
    MatCardContent,
    CurrencyPipe,
    MatIconModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: Product;
  cartService =  inject(CartService)
}
