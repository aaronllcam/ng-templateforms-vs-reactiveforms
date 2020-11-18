import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {


  form: FormGroup;
  formFields = {
    name: 'aaron',
    surname: 'Lluesma',
    email: 'aaron@gmail.com',
    address: {
      district: 'valencia',
      city: 'Sagunto'
    }
  }


  constructor( private formBuilder: FormBuilder) { 
    this.createForm();
    this.loadFieldsForm();
  }

  ngOnInit(): void {
  }

  fieldIsInvalid(field:string):boolean{
    return this.form.get(field).invalid && this.form.get(field).touched;
  }
  

  createForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      address: this.formBuilder.group({
        district: ['', [Validators.required, Validators.minLength(3)]],
        city: ['', [Validators.required, Validators.minLength(3)]]
      }),
      hobbies: this.formBuilder.array([])

    });
  }

  loadFieldsForm(){
    // this.form.setValue(this.formFields) --> hay que especificar todos los campos del formulario
    //con reset no hace falta especificar todos los campoos del formulario
    this.form.reset(this.formFields)

  }

  addHobby(){
    (this.form.get('hobbies') as FormArray).push( this.formBuilder.control(''))
  }

  deleteHobby(idx:number){
    (this.form.get('hobbies') as FormArray).removeAt(idx);

  }
  saveForm(){
    // console.log(this.form);
    if( this.form.invalid ){

      return Object.values(this.form.controls).forEach( items => {

              if(items instanceof FormGroup){
                Object.values(items.controls).forEach( items => {
                  items.markAsTouched(); 
                })
              }else{
                
                items.markAsTouched() 

              }

            });
      
    }
  }

}
