import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { MessageModalComponent } from './message-modal/message-modal.component';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    MessageModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [
    ConfirmationModalComponent,
    MessageModalComponent
  ]
})
export class SharedModule { }
