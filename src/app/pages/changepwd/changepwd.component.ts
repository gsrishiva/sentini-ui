import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { MessageService } from "primeng/api";
import { resetFakeAsyncZone } from "@angular/core/testing";
@Component({
  selector: "app-changepwd",
  templateUrl: "./changepwd.component.html",
  styleUrls: ["./changepwd.component.css"],
})
export class ChangepwdComponent implements OnInit {
  private password: string;
  constructor(
    private _http: HttpClient,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {}

  resetForm = new FormGroup({
    password: new FormControl("", [Validators.required]),
    cnfpassword: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    var chngpwd = {
      email: a.data.email,
      password: this.password,
    };
    this._http
      .put(`${environment.apiUrl}/user/changePassword`, chngpwd)
      .subscribe((res) => {
        if (res["success"] == true) {
          this.messageService.add({
            key: "myKey1",
            severity: "success",
            summary: "Password Changed successfully",
          });
        }
      });
  }
}
