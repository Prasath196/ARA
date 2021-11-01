// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {

  selectedPage:string="overview";
 
  ngOnInit(){

  }
  setPage(page:string){
    this.selectedPage=page;
  }
}
