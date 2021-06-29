import { HttpClient } from "@angular/common/http";
import { Output } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { environment } from "../../../environments/environment";
import { MessageService } from "primeng/api";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-combos",
  templateUrl: "./combos.component.html",
  styleUrls: ["./combos.component.css"],
})
export class CombosComponent implements OnInit {
  cardValue: string;
  rowGroupMetadata: any;
  quantityval: any;
  subProd: any = [];
  arr2: any = [];
  imgUrl: any;

  mainPage: Boolean = true;
  subPage: Boolean;
  prodPage: Boolean;
  prodArr: any = [];
  constructor(
    private _http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}
  @Output() products: any = [];
  @Output() productAdded = new EventEmitter();
  @Output() pages: any = [];
  ngOnInit() {
    this.toggle();
  }

  productsForm = new FormGroup({
    quantity: new FormControl("", [Validators.required, Validators.min(1)]),
  });

  showProdPage(value, itemval) {
    this.prodArr = [];

    if (value == 2) {
      this.prodArr = itemval.items;
      this.subPage = !this.subPage;
      this.mainPage = false;
      this.prodPage = false;
      // this.toggle("solvents");
    } else if (value == 3) {
      this.prodArr = itemval.items;
      this.prodPage = true;
      this.subPage = false;
      this.mainPage = false;
      // this.toggle("");
    } else if (value == 1) {
      this.prodArr = itemval.items;
      this.mainPage = true;
      this.subPage = false;
      this.prodPage = false;
      // this.toggle("");
    }
  }

  toggle() {
    var productType = "CPVC";
    this.cardValue = "Fittings-Combo";
    var data = {
      productType: productType,
      productCategory: this.cardValue,
    };
    let a = [];
    this._http
      .get(
        `${environment.apiUrl}/products/combo?productType=${data.productType}&productCategory=${data.productCategory}`
      )
      .subscribe((result: any) => {
        this.products = result.data;
        let z = [];
        let x = [];
        z = this.products;
        let y = [];
        this.arr2 = [];
        z.forEach((ele) => {
          if (y.indexOf(ele.item) < 0) {
            y.push(ele.item);
          }
        });
        y.forEach((ele, index) => {
          let k = {};
          k["itemName"] = ele;
          k["items"] = z.filter((item) => item.item === ele);
          this.arr2[index] = k;
        });
        this.arr2.forEach((element) => {
          element.items.forEach((ele1) => {
            element.imgUrl = ele1.imgUrl;
          });
        });
      });
  }

  addProductToCart(product, pqty, index) {
    if (pqty > 0) {
      var a = JSON.parse(localStorage.getItem("currentUser"));
      const selectedProduct = {
        item: {
          sNo: product.sNo,
          item: product.item,
          sku_Code: product.sku_Code,
          sku_Description: product.sku_Description,
          basePrice: product.price,
          quantity: pqty,
          price: product.price * pqty,
          size: product.size,
          dealDiscount: product.dealDiscount,
          disDiscount: product.disDiscount,
          productType: product.productType,
          productCategory: product.productCategory,
          std_Pkg: product.std_Pkg,
        },
        user_Id: a.data._id,
        usertype: a.data.userType,
      };

      this._http
        .post(`${environment.apiUrl}/cart/addToCart`, selectedProduct)
        .subscribe((res) => {
          if (res["success"] == true) {
            this.messageService.add({
              key: "myKey1",
              severity: "success",
              summary: "Product Added to cart",
            });
          }
          this.productAdded.emit(product);
        });
    }
  }
}
