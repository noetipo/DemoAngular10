import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  @Input() title: string;
  public productForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      detail:  ['', [Validators.required]],
    });

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
