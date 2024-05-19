import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {GrupoPerguntaService} from './services/grupoPerguntasService/grupo-pergunta.service'
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimationsAsync(),
    GrupoPerguntaService,
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    provideAnimations(), // required animations providers
    provideToastr(),]
};
