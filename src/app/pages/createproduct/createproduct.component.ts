import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { environment } from "../../../environments/environment";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { FormArray } from "@angular/forms";

@Component({
  selector: "app-createproduct",
  templateUrl: "./createproduct.component.html",
  animations: [
    trigger("animation", [
      state(
        "visible",
        style({
          transform: "translateX(0)",
          opacity: 1,
        })
      ),
      transition("void => *", [
        style({ transform: "translateX(50%)", opacity: 0 }),
        animate("300ms ease-out"),
      ]),
      transition("* => void", [
        animate(
          "250ms ease-in",
          style({
            height: 0,
            opacity: 0,
            transform: "translateX(50%)",
          })
        ),
      ]),
    ]),
  ],
})
export class CreateproductComponent implements OnInit {
  name = "Angular";
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.productForm = this.fb.group({
      productType: "",
      productCategory: "",
      item: "",
      sku_Code: "",
      price: "",
      dealDiscount: "",
      disDiscount: "",
      combos: this.fb.array([]),
    });
  }
  ngOnInit(): void {}

  combos(): FormArray {
    return this.productForm.get("combos") as FormArray;
  }

  newcombo(): FormGroup {
    return this.fb.group({
      sku_Description: [""],
      size: [""],
      std_Pkg: [""],
      covers: [""],
      pcs: [""],
    });
  }

  addQuantity() {
    this.combos().push(this.newcombo());
  }

  removeQuantity(i: number) {
    this.combos().removeAt(i);
  }

  onSubmit() {
    //console.log(this.productForm.value);
  }

  postProducts() {
    this._http
      .post(`${environment.apiUrl}/products/combo`, this.productForm.value)
      .subscribe((data) => {});
  }
}
