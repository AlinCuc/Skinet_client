import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import {
  MatCardActions,
  MatCardContent,
  MatCardModule,
} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-product-item',
  imports: [
    MatCardModule,
    MatCardContent,
    CurrencyPipe,
    MatIconModule,
    MatButton,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: Product;
}
