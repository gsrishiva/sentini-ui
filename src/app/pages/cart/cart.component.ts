import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as _ from "lodash";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cartId: any;
  cartItems: any = [];
  summary: any;
  error = "";
  alertmsg: any;
  showbtn: boolean = false;
  cc: any = {};
  total: any = 0;
  subtotal: any = 0;
  totalItems: any = 0;
  otp = "";
  forWhom = "";
  orderButton: any = "Confirm Order";
  ifStatehead: Boolean;
  userInfo: any = JSON.parse(localStorage.getItem("currentUser"));
  closeResult: string;
  constructor(
    private _http: HttpClient,
    private router: Router,
    private toaster: ToastrManager,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCartProds();
    console.log("==== userInfo === ", this.userInfo);
    if (this.userInfo.data.userType == "Statehead") {
      this.orderButton = "Request Order";
      this.ifStatehead = true;
    } else {
      this.ifStatehead = false;
    }
  }

  getCartProds() {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    var user_Id = a.data._id;
    this._http
      .get(`${environment.apiUrl}/cart/getCart/${user_Id}`)
      .subscribe((cartItems: any) => {
        //console.log(cartItems);
        this.cartId = cartItems.data._id;
        this.cartItems = cartItems.data.productsData;
        this.summary = cartItems.data.summary;
        //console.log(this.cartItems);
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

  sendOTP() {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    var mobileNo = {
      mobileNo: String(a.data.mobileNo),
    };
    this._http.post(`${environment.apiUrl}/sms/sendotp`, mobileNo).subscribe(
      (res) => {
        const x = res;
        if (res["success"] == true) {
          //  this.alertmsg = x['success'];
          this.toaster.successToastr(res["message"]);
        } else {
          this.toaster.errorToastr(res["message"]);
        }
      },
      (error) => {
        this.error = error;
      }
    );
  }

  validateOTP() {
    this.showbtn = false;
    var a = JSON.parse(localStorage.getItem("currentUser"));
    var token = {
      mobileNo: String(a.data.mobileNo),
      otp: this.otp,
    };
    this._http
      .post(`${environment.apiUrl}/sms/verifyotp`, token)
      .subscribe((res) => {
        if (res["success"] == true) {
          this.showbtn = true;
          this.toaster.successToastr(res["message"]);
        } else {
          this.toaster.errorToastr(res["message"]);
        }
      });
  }

  placeOrder() {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    this.cc = this.cartItems;
    this.cc.total = this.summary.finalPriceAfterTax;
    this.cc.email = a.data.email;
    var data = {
      products: this.cartItems,
      email: a.data.email,
      total: this.summary.finalPriceAfterTax,
      beforePrice: this.summary.finalPriceWithoutTax,
      totalTax: this.summary.totalTax,
      userId: a.data._id,
      stateheadId: a.data.stateHeadId,
      forWhom: this.forWhom,
    };

    this._http
      .post(`${environment.apiUrl}/cart/placeOrder`, data)
      .subscribe((res) => {
        this.cartItems = [];
        if (res["success"] == true) {
          this.showbtn = true;
          this.router.navigate["/orders"];
          this.toaster.successToastr(res["message"]);
        } else {
          this.toaster.errorToastr(res["message"]);
        }
      });
  }

  decreaseValue(sNo, productPrice, pqty, std_Pkg, sku_Code) {
    // console.log("=== decrease === ", sNo, productPrice, pqty, std_Pkg);
    let unitPrice = productPrice * pqty;
    pqty = pqty - 1;
    let price;
    //console.log("=== updated quantity ==", pqty);
    var a = JSON.parse(localStorage.getItem("currentUser"));
    if (
      std_Pkg == "-" ||
      std_Pkg == "-" ||
      std_Pkg == "" ||
      std_Pkg == null ||
      typeof std_Pkg == "object"
    ) {
      price = productPrice * pqty;
    } else {
      price = productPrice * std_Pkg * pqty;
    }
    //console.log("=== updated price ", price);
    const selectedProduct = {
      _id: this.cartId,
      item: {
        sNo: sNo,
        sku_Code: sku_Code,
        quantity: pqty,
        price: price,
      },
      user_Id: a.data._id,
      usertype: a.data.userType,
    };
    //console.log("=== updated product details ==", selectedProduct.item);
    this._http
      .post(`${environment.apiUrl}/cart/updatecart`, selectedProduct)
      .subscribe((res) => {
        //console.log("===== RESULT == ", res);
        this.getCartProds();
      });
  }

  increaseValue(sNo, productPrice, pqty, std_Pkg, sku_Code) {
    //console.log("=== increase === ", sNo, productPrice, pqty, std_Pkg);
    let unitPrice = productPrice * pqty;
    pqty = pqty + 1;
    let price;
    //console.log("=== updated quantity ==", pqty);
    var a = JSON.parse(localStorage.getItem("currentUser"));
    if (
      std_Pkg == "-" ||
      std_Pkg == "-" ||
      std_Pkg == "" ||
      std_Pkg == null ||
      typeof std_Pkg == "object"
    ) {
      price = productPrice * pqty;
    } else {
      price = productPrice * std_Pkg * pqty;
    }
    //console.log("=== updated price ", price);
    const selectedProduct = {
      _id: this.cartId,
      item: {
        sNo: sNo,
        sku_Code: sku_Code,
        quantity: pqty,
        price: price,
      },
      user_Id: a.data._id,
      usertype: a.data.userType,
    };
    //console.log("=== updated product details ==", selectedProduct);
    this._http
      .post(`${environment.apiUrl}/cart/updatecart`, selectedProduct)
      .subscribe((res) => {
        //console.log("===== RESULT == ", res);
        this.getCartProds();
      });
  }

  deleteProduct(sku_Code) {
    const deleteProduct = {
      _id: this.cartId,
      item: {
        sku_Code: sku_Code,
      },
    };
    this._http
      .post(`${environment.apiUrl}/cart/deleteCart`, deleteProduct)
      .subscribe((res) => {
        //console.log("===== deleted == ", res);
        this.getCartProds();
      });
  }

  open(content) {
    // this._http
    //   .get(`${environment.apiUrl}/products/productList/` + productId)
    //   .subscribe((prod) => {
    //     this.productInfo = prod[0];
    //   });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
