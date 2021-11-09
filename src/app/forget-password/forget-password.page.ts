import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/api.service';
// import { EmailComposer } from '@ionic-native/email-composer/ngx';
// import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  forgetPassForm: FormGroup;
  id: any;
  pass: any;
  email: any;
  userData: any;  constructor(
    private apiService: APIService,
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    // private emailComposer: EmailComposer,
    // private sms: SMS
  ) { }


  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    this.id=this.userData.id;
    this.pass=this.userData.password;
    alert(this.userData);
    this.forgetPassForm = this.fb.group({
      oldPass: ['']
    });
}

  submitForm() {
    //this.sms.send('7266833037', 'Hello world!');

    console.log(this.forgetPassForm.value);
    if (!this.forgetPassForm.valid) {
      return false;
    } else {
      console.log(this.forgetPassForm.value.oldPass);
      this.apiService.updatePass(this.id,this.forgetPassForm.value.oldPass).subscribe(res => {
        console.log(res);
        this.forgetPassForm.reset();
        this.router.navigate(['']);
      });

  }
  }
 /* sendEmail(){
    this.email = {
      to: 'kamana4499@gmail.com',
      cc: 'nilanjana3798@gmail.com',
      bcc: ['official.4699@gmail.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };
    // Send a text message using default options
    this.emailComposer.open(this.email);
  }


*/
}
