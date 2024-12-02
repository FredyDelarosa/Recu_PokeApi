import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Pokemon } from '../../models/pokemon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Inject, PLATFORM_ID } from '@angular/core';
import { RemplacePipe } from "../../pipes/remplace.pipe";

@Component({
  selector: 'app-lista-fav',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, RemplacePipe],
  templateUrl: './lista-fav.component.html',
  styleUrls: ['./lista-fav.component.scss'],
})
export class ListaFavComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'image', 'remove'];
  dataSource = new MatTableDataSource<Pokemon>();
  favoritos: Pokemon[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadFavorites(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedFavorites = JSON.parse(localStorage.getItem('favoritos') || '[]');
      // Verifica que cada Pokémon tenga una URL válida
      this.favoritos = storedFavorites.map((pokemon: Pokemon) => ({
        ...pokemon,
        image: pokemon.image || this.getPokemonImage(pokemon),
      }));
      this.dataSource.data = this.favoritos;
    } else {
      console.warn('localStorage no está disponible en este entorno.');
      this.favoritos = [];
    }
  }

  getPokemonImage(pokemon: Pokemon): string {
    // Genera la URL de la imagen utilizando el ID del Pokémon desde su URL
    const id = pokemon.url?.split('/').filter(Boolean).pop(); 
    return id
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      : '';
  }

  removeFromFavorites(pokemon: Pokemon): void {
    this.favoritos = this.favoritos.filter(fav => fav.name !== pokemon.name);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    this.dataSource.data = this.favoritos; // Actualiza la tabla
  }
}
