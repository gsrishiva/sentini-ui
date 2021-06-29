import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from "@angular/forms";
import { environment } from "../../../environments/environment";
import { ToastrManager } from "ng6-toastr-notifications";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"],
})
export class EmployeesComponent implements OnInit {
  employees: any = [];
  emplistPage: Boolean = true;
  empaddPage: Boolean;
  empForm: FormGroup;
  submitted = false;
  empInfo: any = {};
  closeResult: string;
  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    public toastr: ToastrManager,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.empForm = this.formBuilder.group({
      empId: ["", Validators.required],
      empName: ["", Validators.required],
      empMail: ["", Validators.required],
      empContact_no: ["", Validators.required],
      personal_ContactNo: ["", Validators.required],
      reporting_To: ["", Validators.required],
      doj: ["", Validators.required],
      address: ["", Validators.required],
      headQuarters: ["", Validators.required],
      designation: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      pincode: ["", Validators.required],
    });
  }

  showPage(value) {
    if (value == 1) {
      this.emplistPage = !this.emplistPage;
      this.empaddPage = false;
    } else if (value == 2) {
      this.empaddPage = true;
      this.emplistPage = false;
    }
  }

  get f() {
    return this.empForm.controls;
  }

  getEmployees() {
    this._http
      .get(`${environment.apiUrl}/employee/getEmployees`)
      .subscribe((result: any) => {
        this.employees = result.data.employeeList;
      });
  }

  registerEmployee() {
    this.submitted = true;
    if (this.empForm.invalid) {
      return;
    }
    this._http
      .post(
        `${environment.apiUrl}/employee/registerEmployee`,
        this.empForm.value
      )
      .subscribe((data) => {
        if (data["success"] == true) {
          this.toastr.successToastr("Employee Registered Successfully");
        }
        this.empForm.reset();
        if (data["success"] == false) {
          this.toastr.errorToastr("Employee MailID already Registered");
        }
      });
  }

  editEmployee() {
    this._http
      .post(`${environment.apiUrl}/employee/editEmployee`, this.empInfo)
      .subscribe((data) => {
        if (data["success"] == true) {
          this.toastr.successToastr("Employee details updated Successfully");
        }
        this.empForm.reset();
        if (data["success"] == false) {
          this.toastr.errorToastr("Some thing went Wrong");
        }
      });
  }

  open(content, id) {
    this._http
      .get(`${environment.apiUrl}/employee/employees/` + id)
      .subscribe((emp) => {
        this.empInfo = emp[0];
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
