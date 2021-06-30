import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../services/api.service';

export interface IPokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  abilities: any[];
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  public id: string | null = '';
  selectedPokemon: IPokemonDetails;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    route.paramMap.subscribe(map => this.id = map.get('id'));
  }

  async ngOnInit(): Promise<void> {
    this.selectedPokemon = await this.apiService.getPokemon(this.id);
  }

  formatText(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
