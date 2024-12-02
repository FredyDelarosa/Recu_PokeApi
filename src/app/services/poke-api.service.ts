import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los Pokémon
  getPokemons(limit: number = 10, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}pokemon?limit=${limit}&offset=${offset}`);
  }

  // Método para obtener detalles de un Pokémon específico
  getPokemonDetail(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}pokemon/${name}`);
  }
}
