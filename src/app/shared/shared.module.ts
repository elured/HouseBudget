import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
    imports: [ReactiveFormsModule, FormsModule, NgxChartsModule],
    exports: [ReactiveFormsModule, FormsModule, NgxChartsModule],
    declarations: [NotFoundComponent]
})
export class SharedModule{}