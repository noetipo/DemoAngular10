import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Output() onNew = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public delete(id: number) {
    this.onDelete.emit(id);
  }

  public new() {
    this.onNew.emit(true);
  }

  public edit(id: number) {
    this.onEdit.emit(id);
  }
}
