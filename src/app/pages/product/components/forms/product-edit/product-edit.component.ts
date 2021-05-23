import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @Input() title: string;
  @Input() product: Product;
  public productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      detail: ['', [Validators.required]],
    });

    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        detail: this.product.detail
      });
    }
  }

  public saveForm(): void {
    if (this.productForm.valid) {
      this.activeModal.close(this.productForm.value);
    }
  }

  public cancelForm(): void {
    this.activeModal.close('');
  }

}
