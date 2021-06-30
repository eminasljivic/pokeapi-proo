import {Injectable} from '@angular/core';
import {Pokemon} from '../../model/pokemon.model';
import {IEntry} from '../components/poke-list/poke-list.component';
import {HttpClient} from '@angular/common/http';
import {IPokemonDetails} from '../components/pokemon-details/pokemon-details.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pokemons = [];

  constructor(private httpClient: HttpClient) {
  }

  async getPokemons(): Promise<Array<any>> {
    if (this.pokemons.length === 0) {
      await this.fetchNextPokemons('https://pokeapi.co/api/v2/pokemon');
    }

    return this.pokemons;
  }

  private async fetchNextPokemons(path: string): Promise<boolean> {
    const response = await this.httpClient.get<IEntry>(path).toPromise();

    response.results
      .map(result => new Pokemon(
        +result.url.substring(34, result.url.length - 1),
        result.name.charAt(0).toUpperCase() + result.name.slice(1))
      )
      .forEach(pokemon => this.pokemons.push(pokemon));
    if (response.next != null) {
      return this.fetchNextPokemons(response.next);
    } else {
      return true;
    }
  }

  async getPokemon(id: number | string): Promise<IPokemonDetails> {
    return this.httpClient.get<IPokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`).toPromise();
  }
}
