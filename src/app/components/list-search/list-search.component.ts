import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieServiceService } from 'src/services/movie-service.service';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.css'],
})
export class ListSearchComponent implements OnInit {
  isLoaded = false;
  listMovies: any;
  searchTxt!: string;
  itemsPerPage = 5;
  totalItems!: number;
  page: number = 1;
  isEmpty = false;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieServiceService
  ) {}

  ngOnInit(): void {
    this.searchTxt = '';
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length === 0) {
        this.searchTxt = '';
      } else {
        this.searchTxt = params.keyword;
      }
      this.loadData();
    });
  }
  gty(pageSelected: number) {
    this.loadData();
  }
  loadData() {
    this.isLoaded = false;
    this.listMovies = [];
    this.movieService
      .getMovieBySearch(this.searchTxt, this.page - 1, this.itemsPerPage)
      .subscribe(
        (response: any) => {
          this.totalItems = response.totalItem;
          this.listMovies = response.movie;
          this.isLoaded = true;
          this.isEmpty = this.listMovies.length == 0 ? true : false;
        },
        (err) => {
          this.isLoaded = true;
          console.log(err);
        }
      );
  }
}
