import { Component, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ContextMenuOptions, MenuItemComponent } from './menu-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { CommonModule } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports:
  [
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    MenuItemComponent,
    CommonModule
  ],
  template: `
    <ng-container *ngIf="contextMenuOptions">
      <a style="display: inline" #triggerRef nz-button nz-dropdown [nzDropdownMenu]="rootMenu" nzTrigger="click" [nzClickHide]="false" [(nzVisible)]="visibleMenu" (nzVisibleChange)="nzVisibleChange($event)">
      </a>

      <nz-dropdown-menu #rootMenu="nzDropdownMenu">
        <ul nz-menu>
          <app-menu-item *ngFor="let item of contextMenuOptions" [item]="item" (close)="onClose()"></app-menu-item>
        </ul>
      </nz-dropdown-menu>
    </ng-container>
  `,
})
export class ContextMenuComponent {
  visibleMenu: boolean = false;
  @Input() contextMenuOptions?: ContextMenuOptions[]; 
  @Input() visible?: boolean; 
  @Output() visibleChange = new EventEmitter<boolean>(); 
  @ViewChild('triggerRef') triggerRef?: TemplateRef<NzButtonComponent>;

  onClose() {
    this.visibleMenu = false;
    this.visibleChange?.emit(false);
  }

  nzVisibleChange($event: boolean) {
    this.visibleMenu = $event;
    this.visibleChange?.emit(this.visibleMenu);
  }
  ngOnChanges(changes: SimpleChanges)
  {
    const { visible } = changes;
    if (visible) {
      if (visible.currentValue === true && this.visibleMenu === false) {
        console.log((this.triggerRef?.elementRef.nativeElement));
        (<HTMLElement>this.triggerRef?.elementRef.nativeElement)?.click();
        this.visibleChange?.emit(true);
      }
      else if(this.visibleMenu === true) {
        this.onClose();
      }
    }
  }
}
