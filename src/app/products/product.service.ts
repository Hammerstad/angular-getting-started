import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ProductService {
    private productUrl: string = "api/products/products.json";

    constructor(private http: HttpClient) {

    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log("All: " + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = "";
        if (err.error instanceof ErrorEvent) {
            // Clientside / network error
            errorMessage += `An error occured ${err.error.message}`;
        } else {
            // Unsuccessfull error response
            errorMessage = `Server returned code: ${err.status}, error message is:${err.message}`;
        }

        console.error(errorMessage);
        return throwError(errorMessage);
    }
}