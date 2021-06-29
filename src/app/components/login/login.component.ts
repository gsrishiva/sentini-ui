import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from "app/services/authentication.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { environment } from "environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  alertmsg: any;
  loginPage: Boolean = true;
  resetPage: Boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toaster: ToastrManager,
    private _http: HttpClient,
    private messageService: MessageService,
    public toastr: ToastrManager
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          const x = data;
          if (x.success == true) {
            this.alertmsg = x.message;
            this.toaster.successToastr("Login Successful");
          } else if (x.success === false) {
            alert(x.success);
            this.alertmsg = x.message;
            this.toaster.successToastr("user Suspended");
          }
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
  gotologin() {
    this.router.navigate(["/"]);
  }
  gotoRegister() {
    this.router.navigate(["/registration"]);
  }

  resetPwd() {
    this.loginPage = false;
    this.resetPage = true;
  }

  resetForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  reset() {
    this._http
      .put(`${environment.apiUrl}/user/changePassword`, this.resetForm.value)
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
