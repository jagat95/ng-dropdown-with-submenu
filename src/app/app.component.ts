import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { CheckboxGroup, CheckboxItem, ContextMenuOptions, MenuItemComponent } from './detailed-dropdown-menu/menu-item.component';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { ContextMenuComponent } from './detailed-dropdown-menu/context-menu.component';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    MenuItemComponent,
    DemoNgZorroAntdModule,
    ContextMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ]
})
export class AppComponent {
  visibleMenu: boolean = false;
  title = 'my-angular-app';
  menuItems: ContextMenuOptions[] = [
    {
      internalType: 'CheckboxGroup',
      type: 'single',
      checkboxes: [
        {
          label: 'first'
        },
        {
          label: 'second'
        }
      ],
      onCheckedChange: (ref: CheckboxGroup, arg: CheckboxItem) => {
        console.log("checked change", arg)
      }
    },
    {
      label: 'Item 1',
      type: 'item',
      clicked: () => {
        console.log( this);
      },
      internalType: 'MenuItem'
    },
    {
      label: 'Divider 1',
      type: 'divider',
      internalType: 'MenuItem'
    },
    {
      label: 'Checkbox 1',
      type: 'checkbox',
      checked: true,
      internalType: 'MenuItem'
    },
    {
      internalType: 'MenuItem',
      label: 'Item 2',
      type: 'item',
      children: [
        {
          internalType: 'MenuItem',
          label: 'Sub Item 1',
          type: 'item',
          children: [
            {
              label: 'Sub Item 1.1',
              type: 'item',
              internalType: 'MenuItem'
            },
          ],
        },
        {
          internalType: 'MenuItem',
          label: 'Sub Divider 1',
          type: 'divider',
        },
        {
          internalType: 'MenuItem',
          label: 'Sub Checkbox 1',
          type: 'checkbox',
          checked: false,
        },
      ],
    },

    {
      internalType: 'MenuItem',
      label: 'Item 2',
      type: 'item',
      children: [
        {
          internalType: 'MenuItem',
          label: 'Sub Item 1',
          type: 'item',
          children: [
            {
              internalType: 'MenuItem',
              label: 'Sub Item 1.1',
              type: 'item',
            },
          ],
        },
        {
          internalType: 'MenuItem',
          label: 'Sub Divider 1',
          type: 'divider',
        },
        {
          internalType: 'MenuItem',
          label: 'Sub Checkbox 1',
          type: 'checkbox',
          checked: false,
        },
      ],
    },
  ];

  onClick(event: any) {
    this.visibleMenu = !this.visibleMenu;
  }
}
