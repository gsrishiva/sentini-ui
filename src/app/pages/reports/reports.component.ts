import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  downloadurl: any;
  distributors: any;
  distributorPage: Boolean = true;
  stateHeadPage: Boolean;
  locationPage: Boolean;
  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._http
      .get(
        `${environment.apiUrl}/reports/?financialYear=2021-2022&userType=Distributor`
      )
      .subscribe((result: any) => {
        this.distributors = result.data;
        console.log(this.distributors);
      });
  }

  showReportPage(value) {
    if (value == 1) {
      this.distributorPage = !this.distributorPage;
      this.stateHeadPage = false;
      this.locationPage = false;
    } else if (value == 2) {
      this.stateHeadPage = true;
      this.distributorPage = false;
      this.locationPage = false;
    } else if (value == 3) {
      this.locationPage = true;
      this.stateHeadPage = false;
      this.distributorPage = false;
    }
  }

  downloadFile() {
    const blob = new Blob([], { type: "text/csv" });
    this._http
      .get(
        `${environment.apiUrl}/reports/export?userType=Distributor&financialYear=2021-2022`
      )
      .subscribe((result: any) => {
        const downloadUrl = result.downloadUrl;
        console.log(result.downloadUrl);
        window.open(downloadUrl);
      });
  }
}
