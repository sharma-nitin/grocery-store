import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterContentChecked {
  title = 'sabka-bazaar';
  showFooter = true;

  constructor(private Productservice:ProductService,private cd: ChangeDetectorRef){

  }
  ngOnInit() {
    this.Productservice.showFooter$.subscribe((status:boolean)=>{
      this.showFooter = status;
   })
 }

 ngAfterContentChecked() {
  this.cd.detectChanges();
}
}
