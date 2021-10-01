import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dasboard', url: '/dashboard/', icon: 'home' },
    { title: 'Location Management', url: '/frontend/', icon: 'star' },
    { title: 'Add Recipe', url: 'recipes', icon: 'add' },
    { title: 'Filter', url: '/folder/Filter', icon: 'filter' },
    { title: 'Logout', url: 'logout', icon: 'power' },
  ];
  constructor(
    private router: Router,
  ) {}
}
