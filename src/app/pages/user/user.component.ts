import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, NavigationExtras } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ToastrManager } from "ng6-toastr-notifications";
@Component({
  selector: "user-cmp",
  moduleId: module.id,
  templateUrl: "user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private router: Router,
    private toaster: ToastrManager
  ) {}
  users: any = [];
  files: any = [];
  heads: any = [];
  stateheadId: any;
  distributorId: any;
  distributors: any = [];
  listPage: Boolean = true;
  assignPage: Boolean;
  ngOnInit() {
    this.getUsers();
    this.getStateHeads();
    this.getDistributors();
  }

  getUsers() {
    this._http
      .get(`${environment.apiUrl}/user/getAllUsers`)
      .subscribe((result: any) => {
        this.users = result.data.usersList;
      });
  }

  assignStateHead() {
    let obj = {
      did: this.distributorId,
      sid: this.stateheadId,
    };
    this._http
      .post(`${environment.apiUrl}/user/statehead/assign/distributors`, obj)
      .subscribe((res) => {
        if (res["success"] == true) {
          this.toaster.successToastr(res["message"]);
        } else {
          this.toaster.errorToastr(res["message"]);
        }
      });
  }

  getStateHeads() {
    this._http
      .get(`${environment.apiUrl}/user/getAllStateHeads`)
      .subscribe((result: any) => {
        this.heads = result.data;
      });
  }

  getDistributors() {
    this._http
      .get(`${environment.apiUrl}/user/getAllDistributors`)
      .subscribe((result: any) => {
        this.distributors = result.data;
      });
  }

  showReportPage(value) {
    if (value == 1) {
      this.assignPage = !this.assignPage;
      this.listPage = false;
    } else if (value == 2) {
      this.assignPage = true;
      this.listPage = false;
    }
  }

  onChange(user) {
    user.status = !user.status;
    // user.status = user.checked ? true : false;
    this._http
      .post(`${environment.apiUrl}/user/editUser`, user)
      .subscribe((user) => {
        this.getUsers();
      });
  }

  viewDocs(userId) {
    //console.log("=== from user");
    // console.log((userId).toString())
    const navigationExtras: NavigationExtras = { state: { example: userId } };
    //console.log(navigationExtras);
    this.router.navigate([`/viewdocs`], navigationExtras);
  }
}
