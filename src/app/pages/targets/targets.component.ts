import { Component, OnInit } from "@angular/core";
import { FormControl, FormControlName, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-targets",
  templateUrl: "./targets.component.html",
  styleUrls: ["./targets.component.css"],
})
export class TargetsComponent implements OnInit {
  dealers: any = [];
  distributorPage: Boolean = true;
  empPage: Boolean;
  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.getallDealers();
  }

  showDistributorPage(value) {
    if (value == 1) {
      this.empPage = !this.empPage;
      this.distributorPage = false;
    } else if (value == 2) {
      this.empPage = true;
      this.distributorPage = false;
    }
  }

  targetForm = new FormGroup({
    financialYear: new FormControl(""),
    distributorId: new FormControl(""),
    firmName: new FormControl(""),
    emplyee: new FormControl(""),
    month: new FormControl(""),
    primaryTargetValue: new FormControl(""),
    previousMonthTargetAchieved: new FormControl(""),
    distributorTarget: new FormControl(""),
    collectionTarget: new FormControl(""),
    distributorAppointments: new FormControl(""),
    retailerTarget: new FormControl(""),
    plumbermeetTargets: new FormControl(""),
    secondaryTarget: new FormControl(""),
  });

  getallDealers() {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    var user_Id = a.data._id;

    this._http
      .get(`${environment.apiUrl}/User/getAllDealers/${user_Id}`)
      .subscribe((result) => {
        this.dealers = result;
        this.dealers = this.dealers.data;
        console.log("firm names", this.dealers);
      });
  }

  savetargetData() {
    // this.targetForm["dealers_id"] = this.dealers.id;
    this.dealers.forEach((element) => {
      if (element.id == this.targetForm.value.distributorId) {
        console.log(element);
        this.targetForm.value.firmName = element.firmName;
        console.log(element.firmName);
      }
    });
    console.log(this.targetForm.value);
    this._http
      .put(
        `${environment.apiUrl}/reports/update/sales/target`,
        this.targetForm.value
      )
      .subscribe((data) => {});
  }
}
