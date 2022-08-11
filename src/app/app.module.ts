import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { VideoGameComponent } from './video-game/components/video-game.component';
import { ContactsComponent } from './contacts/contacts.component';
import { VideoGameService } from './video-game/services/video-game.service';
import { OnlyNumberDirective } from './shared/directives/only-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    VideoGameComponent,
    ContactsComponent,
    OnlyNumberDirective,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatIconModule,
    ],
  providers: [VideoGameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
