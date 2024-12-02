import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { Pokemon } from './models/pokemon';
import { TableComponent } from "./component/table/table.component";
import { PokeApiService } from './services/poke-api.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HeaderComponent],
  providers: [PokeApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokeApi';
  favorites: Pokemon[] = [];

  updateFavorites(favorites: Pokemon[]): void {
    this.favorites = favorites;
  }
}
