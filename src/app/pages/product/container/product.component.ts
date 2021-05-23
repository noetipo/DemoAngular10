import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../providers/product/product.service';
import {Product} from '../models/product';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductNewComponent} from '../components/forms/product-new/product-new.component';
import {ProductEditComponent} from '../components/forms/product-edit/product-edit.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[];
  product: Product;
  error: string;

  constructor(private productService: ProductService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
      console.log(this.products);
    }, error => {
      this.error = error;
    });

  }

  public delete(id: number) {
    console.log(id);
    this.productService.deleteProduct(id).subscribe(response => {
      if (response.success) {
        this.getProducts();
      }
    }, error => {
      this.error = error;
    });
    console.log(id);
  }

  public openNewForm(): void {
    const productForm = this.modalService.open(ProductNewComponent, {size: 'lg'});
    productForm.componentInstance.title = 'Nuevo Producto' || null;
    productForm.result.then((result) => {
      if (result) {
        this.productService.postProduct(result).subscribe(response => {
          if (response.success) {
            this.getProducts();
          }
        }, error => {
          this.error = error;
        });
      }
    });

  }

  public openEitForm(id: number): void {

    this.productService.getProductById(id).subscribe(response => {
      this.product = response.data;
      const productForm = this.modalService.open(ProductEditComponent, {size: 'lg'});
      productForm.componentInstance.title = 'Editar Producto' || null;
      productForm.componentInstance.product = this.product;

      productForm.result.then((result) => {
        if (result) {
          this.productService.updateProduct(this.product.id, result).subscribe(responseEdit => {
            if (responseEdit.success) {
              this.getProducts();
            }
          }, error => {
            this.error = error;
          });
        }
      });
    }, error => {
      this.error = error;
    });


  }
}
