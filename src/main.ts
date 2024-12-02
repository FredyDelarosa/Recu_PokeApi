import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config'; // Importa la configuración de la aplicación

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    // Usa los proveedores de appConfig directamente
    ...appConfig.providers, // Expande los proveedores aquí
  ],
}).catch((err) => console.error(err));
