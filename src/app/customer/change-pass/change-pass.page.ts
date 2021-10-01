import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api.service';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {
  passForm: FormGroup;
  id: any;
  pass: any;
  userData: any;  constructor(
    private apiService: APIService,
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    this.id=this.userData.id;
    this.pass=this.userData.password;
    //alert(this.userData);
    this.passForm = this.fb.group({
      oldPass: [''],
      password: [''],
      confPass: ['']
    });
  }

  submitForm() {
    console.log(this.passForm.value);
    if (!this.passForm.valid) {
      return false;
    } else {
      console.log(this.passForm.value.password);
      if(this.passForm.value.oldPass===this.pass){
      // this.apiService.updatePass(this.id,this.passForm.value.password).subscribe(res => {
      //   console.log(res);
      //   this.passForm.reset();
      //   this.router.navigate(['']);
      // });
    }
  }
  }

}
