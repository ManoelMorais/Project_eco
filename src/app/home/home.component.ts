import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products, Product } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct =  product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    this.selectedProduct =  product;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }

    this.displayEditPopup = false;
    this.aditProduct(product, this.selectedProduct.id);
  }

  onConfirmAdd(product: Product) {
    this.displayAddPopup = false;
    this.addProduct(product);
  }

  onProducOutput(product: Product) {
    console.log(product, 'product');
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {
        page,
        perPage,
      })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  aditProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/{id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  deleteProduct(product: Product, id: number) {
    this.productsService.deleteProduct(`http://localhost:3000/clothes/{id}`).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  addProduct(product: Product) {
    this.productsService.addProduct(`http://localhost:3000/clothes`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
