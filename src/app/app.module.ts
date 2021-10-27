import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CompetitionsPageComponent } from './competitions-page/competitions-page.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { CompetitionCalendarPageComponent } from './competitions-page/competition-calendar-page/competition-calendar-page.component';
import { TeamCalendarPageComponent } from './teams-page/team-calendar-page/team-calendar-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './shared/components/input/input.component';
import { TableComponent } from './shared/components/table/table.component';
import { FilterComponent } from './shared/components/filter/filter.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInterceptor } from './shared/app.interceptor';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SearchPipe } from './shared/pipes/search.pipe';

registerLocaleData(ruLocale, 'ru');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CompetitionsPageComponent,
    TeamsPageComponent,
    CompetitionCalendarPageComponent,
    TeamCalendarPageComponent,
    InputComponent,
    TableComponent,
    FilterComponent,
    PreloaderComponent,
    ErrorPageComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {
}
