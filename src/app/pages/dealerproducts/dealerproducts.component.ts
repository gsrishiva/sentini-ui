import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealerproducts',
  templateUrl: './dealerproducts.component.html',
  styleUrls: ['./dealerproducts.component.css']
})
export class DealerproductsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
