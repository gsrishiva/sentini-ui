import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { FormArray } from "@angular/forms";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-samples",
  templateUrl: "./samples.component.html",
  styleUrls: ["./samples.component.css"],
})
export class SamplesComponent implements OnInit {
  products: any;
  arr2: any = [];
  cardValue: string;
  rowGroupMetadata: any;
  quantityval: any;
  subProd: any = [];
  imgUrl: any;
  mainPage: Boolean = true;
  subPage: Boolean;
  prodPage: Boolean;
  prodArr: any = [];
  @Output() productAdded = new EventEmitter();
  constructor(
    private _http: HttpClient,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    // this.getSamples();
  }

  getSamples() {
    this._http
      .get(`${environment.apiUrl}/products/samples`)
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
  showProdPage(value, itemval) {
    this.prodArr = [];
    if (value == 2) {
      this.prodArr = itemval.items;
      this.subPage = !this.subPage;
      this.mainPage = false;
      this.prodPage = false;
    } else if (value == 3) {
      this.prodArr = itemval.items;
      this.prodPage = true;
      this.subPage = false;
      this.mainPage = false;
    } else if (value == 1) {
      this.prodArr = itemval.items;
      this.mainPage = true;
      this.subPage = false;
      this.prodPage = false;
    }
  }

  toggle(button) {
    var productType = "CPVC";
    this.cardValue = button.id;
    var data = {
      productType: productType,
      productCategory: this.cardValue,
    };
    let a = [];
    this._http
      .post(`${environment.apiUrl}/products/samples`, data)
      .subscribe((result: any) => {
        this.products = result.data.productsList;
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
          quantity: pqty,
          size: product.size,
        },
        user_Id: a.data._id,
        usertype: a.data.userType,
      };

      this._http
        .post(`${environment.apiUrl}/cart/addToCart`, selectedProduct)
        .subscribe((res) => {
          //console.log("from samples", res);
          if (res["success"] == true) {
            this.messageService.add({
              key: "myKey1",
              severity: "success",
              summary: "Product Added to cart",
            });
          }
          this.productAdded.emit(product);
          //console.log("adding sample", selectedProduct);
        });
    }
  }
}
