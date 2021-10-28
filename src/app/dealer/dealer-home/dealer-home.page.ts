import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealer-home',
  templateUrl: './dealer-home.page.html',
  styleUrls: ['./dealer-home.page.scss'],
})
export class DealerHomePage implements OnInit {
  public tabs = [
    { url: 'dealer', icon: 'home' },
    { url: 'my-dues', icon: 'calculator' },
    { url: 'my-account', icon: 'person' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
