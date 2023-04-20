import { NgModule } from "@angular/core";
import { CalculatorModule } from "./calculator/calculator.module";
import { RouterModule, Routes } from "@angular/router";
import { CalculatorComponent } from "./calculator/calculator.component";

const route: Routes = [
    { path: 'calculator', component: CalculatorComponent },
    { path: 'converter', loadChildren: () => import('./converter/converter.module').then(m => m.ConverterModule)},
    { path: '**', pathMatch: 'full', redirectTo: 'calculator' }
]

@NgModule({
    imports: [
        CalculatorModule,

        RouterModule.forRoot(route),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}