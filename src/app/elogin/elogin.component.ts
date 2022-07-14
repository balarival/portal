import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SignInData } from '../model/esigndata';
import { AuthenticationService } from '../service/authentication/eauthentication.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-elogin',
  templateUrl: './elogin.component.html',
  styleUrls: ['./elogin.component.css']
})
export class EloginComponent implements OnInit {

  person : string="";
  pass : string="";
  // loginForm: FormGroup;
  loading = false;
  submitted = false;
  // returnUrl: string;
  error = '';
  uname : string="";
pwd : string="";
name: string="";

isFormValid = false;
areCredentialsInvalid = false;
  constructor(private http:HttpClient, private router: Router, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }
  getValues(val:string){
   console.warn(val) ;
  }
  getresult(f:any) {
    if (!f.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(f);
  }
  
  private checkCredentials(signInForm:any) {
    const signInData = new SignInData(signInForm.value.uname, signInForm.value.pwd);
    this.authenticationService.authenticate(signInData);
    if (!signInData.ans) {
      // console.log("Check");
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
    }
  }
}
