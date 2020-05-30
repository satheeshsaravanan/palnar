import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
 
import { AppRoutingModule } from './app-routing.module';
 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
 
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ItemDetailsComponent,
    ItemlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
