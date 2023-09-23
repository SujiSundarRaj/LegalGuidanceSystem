import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login/login.component';
import { QnaListComponent } from './modules/qna/qna-list/qna-list.component';
import { SearchBoxComponent } from './modules/search/search-box/search-box.component';
import { SolicitorsListComponent } from './modules/solicitors/solicitors-list/solicitors-list.component';
import { SolicitorsComponent } from './modules/solicitors/solicitors/solicitors.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'search',
    component: SearchBoxComponent,
  },
  {
    path: 'solicitor',
    component: SolicitorsComponent,
  },
  {
    path: 'qna',
    component: QnaListComponent,
  },
  {
    path: 'solicitor-list',
    component: SolicitorsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
