import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ROUTES } from "../../sidebar/sidebar.component";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { CartService } from "app/services/cart.service";
import { AuthenticationService } from "app/services/authentication.service";
import { HttpClient } from "@angular/common/http";
import * as _ from "lodash";
import { environment } from "../../../environments/environment";
@Component({
  moduleId: module.id,
  selector: "navbar-cmp",
  styleUrls: ["./navbar.component.css"],
  templateUrl: "navbar.component.html",
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;
  cartItems: any = [];

  constructor(
    location: Location,
    private renderer: Renderer2,
    private auth: AuthenticationService,
    private element: ElementRef,
    private router: Router,
    private cartservice: CartService,
    private _http: HttpClient
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });

    // this.getCartProds();
  }
  getCartProds() {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    var user_Id = a.data._id;
    this._http
      .get(`${environment.apiUrl}/cart/getCart/${user_Id}`)
      .subscribe((cartItems: any) => {
        this.cartItems = cartItems.data.productsData;
        //console.log("from cart component", cartItems);
      });
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = "";
      }, 500);
    }
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    //console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  showCart() {
    this.router.navigate(["/cart"]);
    this.getCartProds();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  changePwd() {
    this.router.navigate(["/changepwd"]);
  }
}
