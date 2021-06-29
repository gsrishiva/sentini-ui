import { environment } from "../../environments/environment";

export class ApiService {
  public static API = {
    ADD_PRODUCT: environment.apiUrl + "/cart/addToCart",
  };
}
