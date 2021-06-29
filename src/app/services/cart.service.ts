import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as _ from "lodash";
import { environment } from "../../environments/environment";
import { MessageService } from "primeng/api";
import { ApiService } from "./api.service";
@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(
    private _http: HttpClient,
    private messageService: MessageService
  ) {}
  cartItems: any = [];
  totalItems: any = 0;
  total: any = 0;
  subtotal: any = 0;
  @Output() productAdded = new EventEmitter();

  getCartProds() {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    var user_Id = a.data._id;
    //console.log(user_Id);
    this._http
      .get(`${environment.apiUrl}/cart/getCart/${user_Id}`)
      .subscribe((cartItems) => {
        this.cartItems = cartItems[0].products;
        this.getTotal(this.cartItems);
        this.totalItems = this.cartItems.length;
      });
  }

  getTotal(cart) {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    _.each(cart, (p) => {
      this.total = this.total + p.price;
    });
    this.subtotal = this.total;
    this.total = this.total + this.total * 0.18;
    this.total = this.total.toFixed(2);
  }

  addproductService(data: any) {
    return this._http.post(ApiService.API.ADD_PRODUCT, data);
  }
}
