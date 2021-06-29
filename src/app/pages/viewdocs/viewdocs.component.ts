import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
@Component({
  selector: "app-viewdocs",
  templateUrl: "./viewdocs.component.html",
  styleUrls: ["./viewdocs.component.css"],
})
export class ViewdocsComponent implements OnInit {
  userDocs: any = [];
  userId: string;
  example: any;
  user: boolean;
  stateHeadsList: any = [];
  userList: any = [];

  constructor(private _http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { example: any };
    this.example = state.example;
  }

  ngOnInit(): void {
    this.getuserDocs();
    this.getStateHeads();
    this.getUsers();
  }

  getuserDocs() {
    this._http
      .get(`${environment.apiUrl}/user/upload/documents/` + this.example + "")
      .subscribe((result: any) => {
        this.userDocs = result.data;
      });
    //console.log('from docs', this.userDocs)
  }

  approveUser() {
    this._http
      .post(`${environment.apiUrl}/user/editUser`, {
        _id: this.example,
        isDocumentsApproved: true,
      })
      .subscribe((user) => {
        //console.log(user)
      });
  }

  getStateHeads() {
    this._http
      .get(`${environment.apiUrl}/user/getAllUsers?userType=Statehead`)
      .subscribe((result: any) => {
        this.stateHeadsList = result;
        this.stateHeadsList = result.data.usersList;
        console.log("from statehead", this.stateHeadsList);
      });
  }
  getUsers() {
    this._http
      .get(`${environment.apiUrl}/user/getAllUsers?userType=Distributor`)
      .subscribe((result: any) => {
        this.userList = result.data.usersList;
        console.log("from Distributor", this.userList);
      });
  }

  assignStateHead() {
    this._http
      .get(`${environment.apiUrl}/user/statehead/assign/distributors`)
      .subscribe((result: any) => {
        //this.result = result.data;
        console.log();
      });
  }
}
