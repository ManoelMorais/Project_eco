import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayCharger = new EventEmitter<boolean>();
  @Input() header!: string;

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
    id: 0,
  };

  @Output() confirm = new EventEmitter<Product>();

  specialCharactersValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );
      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharactersValidator()]],
    image: [''],
    price: ['', [Validators.required]],
    rating: [0],
  });

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    this.confirm.emit(this.product);
    this.display = false;
    this.displayCharger.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayCharger.emit(this.display);
  }
}
