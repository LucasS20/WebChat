import { ApplicationConfig,importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {GrupoPerguntaService} from './services/grupoPerguntasService/grupo-pergunta.service'
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),GrupoPerguntaService,importProvidersFrom(HttpClientModule),provideHttpClient(withFetch())]
};
