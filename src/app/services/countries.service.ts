import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  
  private url = 'https://restcountries.eu/rest/v2/';

  constructor(private http:HttpClient) { }

  getCountries(){

    return this.http.get(`${this.url}lang/es`)
                    .pipe( map( (countries:any[]) => {
                      return countries.map( country => {
                        return {
                          name: country.name,
                          code: country.alpha3Code
                        }
                      })
                    }));

  }
}
