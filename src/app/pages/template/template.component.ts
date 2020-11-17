import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from './../../services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {


  user = {
    name: "aaron",
    surname: "lluesma",
    email: "aaron@gmail.com",
    country: "CRI",
    genre: "hombre"
  }
  countries:any[] = [];

  constructor(private countriesService:CountriesService) { }

  ngOnInit(): void {

      this.countriesService.getCountries().subscribe( countries => {
        this.countries = countries;
        this.countries.unshift({name: "Seleccione país", code: ''});
        console.log(this.countries);

      });
  }

  save( form: NgForm ){

    if( form.invalid ){

      Object.values(form.controls).forEach( items => items.markAsTouched() )
      return;
    }
    console.log("submit disparado");
    console.log(form.value);
  }

}
