import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as _ from "lodash";
import { FormGroup, FormControl } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { MessageService } from "primeng/api";
import { ToastrManager } from "ng6-toastr-notifications";
@Component({
  selector: "products-cmp",
  moduleId: module.id,
  templateUrl: "products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  collection = [];
  constructor(
    private _http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private messageService: MessageService,
    public toastr: ToastrManager
  ) {
    for (let i = 1; i <= 100; i++) {
      let Obj = { name: `Employee Name ${i}`, code: `EMP00 ${i}` };
      this.collection.push(Obj);
    }
  }
  products: any = [];
  prod: any = [];
  productInfo: any = {};
  closeResult: string;
  items: any = [];
  fileToUpload: File = null;
  public savesamplestatus: boolean = false;
  sampleProd = {};
  ngOnInit() {
    this.getProds();
    this.getItems();
  }

  getProds() {
    this._http.get(`${environment.apiUrl}/products`).subscribe((products) => {
      this.products = products;
    });
  }

  getItems() {
    this._http
      .get(`${environment.apiUrl}/products/items`)
      .subscribe((result) => {
        this.items = result;
        this.items = this.items.data;
      });
  }

  selectedname;
  imgForm = new FormGroup({
    itemName: new FormControl(""),
  });

  uploadImg() {
    const formData: FormData = new FormData();
    formData.append("productImage", this.fileToUpload, this.fileToUpload.name);
    formData.append("itemName", this.selectedname);
    //console.log("drop list", this.selectedname);
    this._http
      .post(`${environment.apiUrl}/products/images`, formData)
      .subscribe((data) => {
        if (data["success"] == true) {
          this.toastr.successToastr("Product Image uploaded Successfully");
        }
      });
  }

  prodForm = new FormGroup({
    productType: new FormControl([null, ""]),
    productCategory: new FormControl(""),
    dealDiscount: new FormControl(""),
    disDiscount: new FormControl(""),
  });

  updatePercentage() {
    //console.log(this.prodForm.value);
    this._http
      .post(
        `${environment.apiUrl}/products/updatepercentage`,
        this.prodForm.value
      )
      .subscribe((data) => {
        if (data["success"] == true) {
          this.toastr.successToastr("New Discounts updated Successfully");
        }
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  importProd() {
    const formData: FormData = new FormData();
    formData.append("xlsxfile", this.fileToUpload, this.fileToUpload.name);
    this._http
      .post(
        `${environment.apiUrl}/products/upload?productType=${this.prodForm.controls.productType.value}&productCategory=${this.prodForm.controls.productCategory.value}&dealerdiscount=${this.prodForm.controls.dealDiscount.value}&distributordiscount=${this.prodForm.controls.disDiscount.value}`,
        formData
      )
      .subscribe((res) => {
        if (res["success"] == true) {
          this.toastr.successToastr("Products Imported Successfully");

          // });
        }
        this.getProds();
      });
  }

  open(content, productId) {
    this._http
      .get(`${environment.apiUrl}/products/productList/` + productId)
      .subscribe((prod) => {
        this.productInfo = prod[0];
      });
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

  editproduct() {
    this._http
      .post(`${environment.apiUrl}/products/editProduct`, this.productInfo)
      .subscribe((data) => {});
  }

  onCheck(value, productId) {
    this.savesamplestatus = value;

    if (value) {
      this.sampleProd = {
        id: productId,
        checked: false,
      };
    } else {
      this.sampleProd = {
        id: productId,
        checked: true,
      };
    }

    console.log("from product status", this.sampleProd);
    this._http
      .post(`${environment.apiUrl}/products/checkforsample`, this.sampleProd)
      .subscribe((product: any) => {
        console.log("checked sample");
      });
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

  openProd() {
    this.router.navigate([""]);
  }
}
