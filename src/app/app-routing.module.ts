/**
 * Date: 23 September 2021
 * Title: BCRS - App Routing
 * Author: Mark Watson, Eunice Lim
 * Description: App routing file.
 */

import { HomeComponent } from "./pages/home/home.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./pages/signin/signin.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";
import { UserCreateComponent } from "./pages/user-create/user-create.component";
import { SecurityQuestionListComponent } from "./pages/security-question-list/security-question-list.component";
import { SecurityQuestionDetailsComponent } from "./pages/security-question-details/security-question-details.component";
import { SecurityQuestionCreateComponent } from "./pages/security-question-create/security-question-create.component";
import { AuthGuard } from "./shared/auth.guard";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ErrorComponent } from "./pages/error/error.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { AboutComponent } from "./pages/about/about.component";
import { RegisterComponent } from "./pages/register/register.component";
import { VerifyUsernameFormComponent } from "./shared/verify-username-form/verify-username-form.component";
import { VerifySecurityQuestionsFormComponent } from "./shared/verify-security-questions-form/verify-security-questions-form.component";
import { ResetPasswordFormComponent } from "./shared/reset-password-form/reset-password-form.component";
import { PurchasesByServiceGraphComponent } from "./pages/purchases-by-service-graph/purchases-by-service-graph.component";

const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "contact",
        component: ContactComponent,
      },
      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "users",
        component: UserListComponent,
      },
      {
        path: "users/:userId",
        component: UserDetailsComponent,
      },
      {
        path: "users/create/new",
        component: UserCreateComponent,
      },
      {
        path: "security-questions",
        component: SecurityQuestionListComponent,
      },
      {
        path: "security-questions/:id",
        component: SecurityQuestionDetailsComponent,
      },
      {
        path: "security-questions/create/new",
        component: SecurityQuestionCreateComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: "session",
    component: AuthLayoutComponent,
    children: [
      {
        path: "signin",
        component: SigninComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: 'forgot',
        component: VerifyUsernameFormComponent
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsFormComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent
      },
      /* 404 and 500 page. All invalid paths redirect to 404 */
      {
        path: "404",
        component: NotFoundComponent,
      },
      {
        path: "500",
        component: ErrorComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "session/404",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
