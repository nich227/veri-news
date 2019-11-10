import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {GaugesModule} from 'ng-beautiful-gauges';
import { StateService } from './state.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResultsPageComponent } from './results-page/results-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HeaderComponent,
    FooterComponent,
    ResultsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GaugesModule
  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
