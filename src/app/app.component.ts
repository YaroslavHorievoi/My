import { Component } from '@angular/core';

import { CurrentPage } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'applicantExercise';

  public currentPage: CurrentPage = CurrentPage.VIDEO_GAME;
  public pages: typeof CurrentPage = CurrentPage;

  public changeCurrentPage(page: CurrentPage): void {
    this.currentPage = page;
  }
}
