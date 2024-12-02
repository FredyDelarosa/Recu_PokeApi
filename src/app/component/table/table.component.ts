import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokeApiService } from '../../services/poke-api.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { Pokemon } from '../../models/pokemon';
import { RemplacePipe } from '../../pipes/remplace.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, RemplacePipe, MatIconModule, CommonModule, MatPaginator, MatSnackBarModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'details', 'image', 'favorite'];
  dataSource = new MatTableDataSource<Pokemon>();
  pokemons: Pokemon[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pokeApiService: PokeApiService,
    private router: Router,
    private snackBar: MatSnackBar // Inyección del servicio MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchPokemons(): void {
    this.pokeApiService.getPokemons(150, 0).subscribe((response: any) => {
      this.pokemons = response.results.map((pokemon: any, index: number) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return {
          ...pokemon,
          position: index + 1,
          name: pokemon.name,
          image: imageUrl,
          isFavorite: false,
        };
      });
      this.dataSource.data = this.pokemons;
    });
  }

  toggleFavorite(pokemon: Pokemon): void {
    if (!pokemon.isFavorite && this.getFavoritesCount() >= 5) {
      this.showLimitReachedMessage(); // Mostrar advertencia si ya hay 5 favoritos
      return;
    }

    pokemon.isFavorite = !pokemon.isFavorite;
    this.updateFavoriteList(pokemon);
  }

  updateFavoriteList(pokemon: Pokemon): void {
    const favoritos: Pokemon[] = JSON.parse(localStorage.getItem('favoritos') || '[]');

    if (pokemon.isFavorite) {
      if (!favoritos.some((fav) => fav.name === pokemon.name)) {
        favoritos.push({ ...pokemon });
      }
    } else {
      const index = favoritos.findIndex((fav) => fav.name === pokemon.name);
      if (index !== -1) favoritos.splice(index, 1);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }

  getFavoritesCount(): number {
    const favoritos: Pokemon[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    return favoritos.length;
  }

  showLimitReachedMessage(): void {
    this.snackBar.open('You can only add up to 5 Pokémon to your favorites!', 'OK', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  navigateToDetails(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.name]);
  }
}
