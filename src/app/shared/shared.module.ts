import { NgModule } from '@angular/core';
import { ToolbarModule } from './components/toolbar/toolbar.module';


@NgModule({
  imports: [
    ToolbarModule,

  ],
  exports: [
    ToolbarModule,
  ],
  declarations: [],
  providers: [],
})
export class SharedModule { }
