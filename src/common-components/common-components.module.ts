import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FileListComponent } from './file-list/file-list.component';
import { AddFileModalComponent } from './add-file-modal/add-file-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavBarComponent,
    FileListComponent,
    AddFileModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    FileListComponent,
  ]
})
export class CommonComponentsModule { }
