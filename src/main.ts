/**
 * Title: BCRS
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim, Adam Luna, Mark Watson
 * Date: 21 Sept 2021
 * Description: Main TS file.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
