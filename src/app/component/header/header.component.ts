import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  onPokedexClick(): void {
    this.router.navigate(['/lista']); // Cambia la ruta si es necesario
  }
}
