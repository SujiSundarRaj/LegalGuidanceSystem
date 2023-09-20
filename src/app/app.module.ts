import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FooterModule } from './modules/footer/footer.module';
import { HeaderModule } from './modules/header/header.module';
import { LoginModule } from './modules/login/login.module';
import { QnaModule } from './modules/qna/qna.module';
import { SearchModule } from './modules/search/search.module';
import { SolicitorsModule } from './modules/solicitors/solicitors.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HeaderModule,
    CoreModule,
    SearchModule,
    SolicitorsModule,
    QnaModule,
    FooterModule,
    ModalModule.forRoot(),
    LoginModule,
    BsDropdownModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
