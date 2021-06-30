import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '../../../model/pokemon.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ApiService} from '../../services/api.service';

export interface IEntry {
  next: string;
  results: [{
    name: string,
    url: string
  }];
}

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  filter: string;
  pokemons: any;
  displayedColumns = ['id', 'name'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpClient: HttpClient, private apiService: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.pokemons = await this.apiService.getPokemons();
    this.dataSource.data = this.pokemons;
    this.dataSource.sort = this.sort;
    this.paginator.pageSize = 15;
    this.dataSource.paginator = this.paginator;
  }

  filterPokemons(): void {
    this.dataSource.data = this.pokemons.filter(value => value.name.toLowerCase().includes(this.filter.toLowerCase()));
  }
}
