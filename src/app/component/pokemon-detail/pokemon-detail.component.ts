import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { FirsUpperPipe } from '../../pipes/firs-upper.pipe';
import { RemplacePipe } from '../../pipes/remplace.pipe';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  standalone: true,
  selector: 'app-pokemon-detail',
  imports: [CommonModule, MatTabsModule, FirsUpperPipe, RemplacePipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail: any;

  constructor(
    private route: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    const pokemonName = this.route.snapshot.paramMap.get('name');
    if (pokemonName) {
      this.pokeApiService.getPokemonDetail(pokemonName).subscribe((detail) => {
        this.pokemonDetail = detail;
      });
    }
  }
}
