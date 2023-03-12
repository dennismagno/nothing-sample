import { Subject } from 'rxjs';  
import { takeUntil } from 'rxjs/operators'; 
import { Component, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
  constructor(public appService: AppService ){}
  products: any = [];
  errorMsg: string = "";
  destroy: Subject<boolean> = new Subject<boolean>();
  
  ngOnDestroy() {
    this.destroy.next(true);`1`
    this.destroy.unsubscribe();
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {  
    const formData = new FormData();  

    // Reset data
    this.products = [];
    this.errorMsg = "";

    this.appService.getProducts()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (resp) => this.products = resp,
        error: (err) => this.errorMsg = err.error
      });
  }
}
