import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokeListComponent} from './components/poke-list/poke-list.component';
import {PokemonDetailsComponent} from './components/pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: 'pokemons', component: PokeListComponent },
  { path: 'pokemons/:id', component: PokemonDetailsComponent },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: '**', redirectTo: '/pokemons'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
