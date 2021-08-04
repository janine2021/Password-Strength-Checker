import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordStrengthComponent } from './components/password-strength/password-strength.component';

const routes: Routes = [
    { path: '', component: PasswordStrengthComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
