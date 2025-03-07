import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItems } from '../interfaces/nav-items';

@Component({
  selector: 'lib-vertical-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, NgFor],
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.css',
})
export class VerticalNavbarComponent {
  @Input() navItems!: NavItems[];
}
