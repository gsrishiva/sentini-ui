import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-register",
  styleUrls: ["./register.component.css"],
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  registerUserData = {};
  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private toaster: ToastrManager,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        password_confirmation: [
          "",
          [Validators.required, Validators.minLength(6)],
        ],
        firmName: ["", Validators.required],
        constitution: ["", Validators.required],
        regNo: ["", Validators.required],
        estDate: ["", Validators.required],
        gstNo: ["", Validators.required],
        panNo: ["", Validators.required],
        userType: ["", Validators.required],
        mobileNo: ["", Validators.required],
        city: ["", Validators.required],
        state: ["", Validators.required],
        pinCode: ["", Validators.required],
        address: [""],
        authPersonName: ["", Validators.required],
        authPersonMobileNo: [
          "",
          [
            Validators.required,
            Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
          ],
        ],
        godownLocation: [""],
        godownArea: [""],
        totalStaff: [""],
        noOfSalesStaff: [""],
        finWorkingCapital: [""],
        finOwnCap: [""],
        finBorrowCap: [""],
        finTotalCap: [""],
        bankName: ["", Validators.required],
        bankBranch: ["", Validators.required],
        bankAccountNo: ["", Validators.required],
        existingBusinessYear: [""],
        existingProduct: [""],
        existingLastYearTurnOver: [""],
        existingNoOfDealers: [""],
        supplyMaterial: [""],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: this.checkIfMatchingPasswords(
          "password",
          "password_confirmation"
        ),
      }
    );
  }
  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    //console.log('from form', this.registerForm.value)
    this._auth
      .registerUser(this.registerForm.getRawValue())
      .subscribe((res) => {
        const x = res;
        if (x.success == true) {
          // this.alertmsg = x.message;
          this.toaster.successToastr("registration Successful");
          this.router.navigate(["../login"]);
        } else if (x.success == false) {
          //this.alertmsg = x.message
          this.toaster.errorToastr(x.message);
        }
      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
