import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { VideoGameInterface } from '../models/video-game.interface';

@Injectable()
export class VideoGameService {
    public constructor(
        private httpClient: HttpClient,
    ) {}

    public getAllVideoGames(): Observable<VideoGameInterface[]> {
        return this.httpClient.get<VideoGameInterface[]>('https://public.connectnow.org.uk/applicant-test/');
    }
}
