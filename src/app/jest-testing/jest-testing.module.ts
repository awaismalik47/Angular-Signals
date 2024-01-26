import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JestTestingRoutingModule } from './jest-testing-routing.module';
import { BasicTestingComponent } from './TestingComponents/basic-testing/basic-testing.component';
import { ServiceTestingComponent } from './TestingComponents/service-testing/service-testing.component';


@NgModule({
  declarations: [BasicTestingComponent,ServiceTestingComponent],
  imports: [

    CommonModule,
    JestTestingRoutingModule
  ]
})
export class JestTestingModule { }
