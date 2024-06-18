import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';

export interface MenuItem {
  internalType: 'MenuItem'
  label?: string;
  type: 'item' | 'divider' | 'checkbox';
  checked?: boolean,
  clicked?: () => void;
  children?: ContextMenuOptions[];
}

export interface CheckboxGroup {
  internalType: 'CheckboxGroup'
  type: 'single' | 'multiple'
  checkboxes: CheckboxItem[];
  onCheckedChange: (ref: CheckboxGroup, changed: CheckboxItem) => void;
}

export interface CheckboxItem {
  label: string;
  checked?: boolean;
}
export type ContextMenuOptions = MenuItem | CheckboxGroup;


@Component({
  standalone: true,
  imports:
  [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuItemComponent,
    DemoNgZorroAntdModule
  ],
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.less',
})
export class MenuItemComponent {
  @Input() item!: MenuItem | CheckboxGroup;
  @Output() close = new EventEmitter<any>();

  checkboxGroup?: CheckboxGroup;
  menuItem?: MenuItem; 
  visibleSubMenu: boolean = false;
  placement: any;

  constructor()
  {
    this.placement = "rightTop"; // important to initialize here, seems like there is bug where nzPlacementType expects topRight, setting here we force correct value. 
  }

  ngOnChanges(change: SimpleChanges)
  {
    const { item } = change;
    if (item) {
      this.checkboxGroup = <CheckboxGroup>this.item;
      this.menuItem = <MenuItem>this.item;
    }
  }

  onItemClick(item: MenuItem | CheckboxGroup): void {
    if (item.internalType === 'MenuItem') {
      this.onMenuItemClicked(item as MenuItem);
    }
    if (item.internalType === 'CheckboxGroup') {
      this.onCheckboxGroupClicked(item as CheckboxGroup);
    }
    console.log('Item clicked:', item);
  }

  isCheckboxGroup(item: MenuItem | CheckboxGroup): boolean {
    return item.internalType === 'CheckboxGroup';
  }

  onMenuItemClicked(item: MenuItem) {
    if (item.type === 'item') {
      this.close.emit();
    }
    item.clicked && item.clicked();
  }

  onCheckboxGroupClicked(item: CheckboxGroup) { }

  onCheckboxGroupChange(checkbox: CheckboxItem) {
    console.log(checkbox, this.checkboxGroup === this.item);
    if (this.checkboxGroup?.type === 'single') {
      this.checkboxGroup.checkboxes.forEach(x => { 
        if (x !== checkbox) {
          x.checked = false;
          console.log("setting to false", x);
        }
      });
    }
    this.checkboxGroup?.onCheckedChange && this.checkboxGroup.onCheckedChange(this.checkboxGroup, checkbox);
  }


  onChildClose() {
    this.visibleSubMenu = false;
    this.close.emit();
  }
  onVisibleChange(visible: boolean): void {
    if (visible) {
      console.log('Submenu is visible!');
    }
  }
}
