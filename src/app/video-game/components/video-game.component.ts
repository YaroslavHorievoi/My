import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VideoGameService } from '../services/video-game.service';
import { VideoGameFilterInterface, VideoGameInterface } from '../models/video-game.interface';

@Component({
  selector: 'app-video-game',
  templateUrl: './video-game.component.html',
  styleUrls: ['./video-game.component.scss'],
})
export class VideoGameComponent implements OnInit {
  public games$: Observable<VideoGameInterface[]> = new Observable<VideoGameInterface[]>();
  public filteredGames$: Observable<VideoGameInterface[]> = new Observable<VideoGameInterface[]>();
  public filterForm: FormGroup = this.fb.group({
    gameName: [''],
    gameRating: [''],
    orderName: [''],
    order: [''],
  });
  public orderByOptions: string[] = ['Release Date', 'Score', 'Name'];
  public orderIcon: boolean = true;

  constructor(
    private videoGameService: VideoGameService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getGames();

    this.filteredGames$ = this.games$;

    this.filterForm.valueChanges.subscribe((val: VideoGameFilterInterface) => {
      this.filterGames(val);

      if (val.orderName) {
        this.sortGames(val.orderName);
      }
    })
  }

  public resetFilters(): void {
    this.filterForm.reset();
    this.getGames();
  }

  public changeOrderIcon(): void {
    this.orderIcon = !this.orderIcon;
    this.filterForm.controls['order'].setValue(this.orderIcon);
  }

  public sortGames(order: string): void {
    this.filteredGames$ = this.filteredGames$.pipe(
        map((games: VideoGameInterface[]) => {
          switch(order) {
            case 'Score':
              if (this.orderIcon) {
                return games.sort((a: VideoGameInterface, b: VideoGameInterface) => a.rating - b.rating)
              } else {
                return games.sort((a: VideoGameInterface, b: VideoGameInterface) => b.rating - a.rating)
              }
            case 'Name':
              if (this.orderIcon) {
                return games.sort((a: VideoGameInterface,b: VideoGameInterface) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : 0));
              } else {
                return games.sort((a: VideoGameInterface,b: VideoGameInterface) => (b.name.toLowerCase() < a.name.toLowerCase()) ? -1 : ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0));
              }
            case 'Release Date':
              if (this.orderIcon) {
                return games.sort((a: VideoGameInterface, b: VideoGameInterface) => a.first_release_date - b.first_release_date)
              } else {
                return games.sort((a: VideoGameInterface, b: VideoGameInterface) => b.first_release_date - a.first_release_date)
              }
            default:
              return games
          }
        })
    );
  }

  private getGames(): void {
    this.games$ = this.videoGameService.getAllVideoGames();
  }

  private filterGames(filters: VideoGameFilterInterface): void {
    this.filteredGames$ = this.games$.pipe(
        map((games: VideoGameInterface[]) => {
          return games.filter(game =>  {
            let nameFilter = !filters.gameName || game.name.toLowerCase().includes(filters.gameName.toLowerCase());
            let ratingFilter = !filters.gameRating || game.rating > filters.gameRating;

            return nameFilter && ratingFilter
          })
        })
    );
  }
}
