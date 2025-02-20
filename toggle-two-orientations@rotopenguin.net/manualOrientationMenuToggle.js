/* manualOrientationMenuToggle.js
* Copyright (C) 2024 shyzus
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import GObject from 'gi://GObject';

import { QuickMenuToggle } from 'resource:///org/gnome/shell/ui/quickSettings.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as Rotator from './rotator.js'

export const ManualOrientationMenuToggle = GObject.registerClass(
class ManualOrientationMenuToggle extends QuickMenuToggle {
    constructor(ext) {
      super({
        title: 'Rotate',
        iconName: 'object-rotate-left-symbolic',
        menuEnabled: false,
        toggleMode: false,
      });

      this.menu.setHeader('object-rotate-left-symbolic', 'Screen Rotate');
      // Anything that involves "fetching the display info from dbus" is inside a Promise.
      // A promise is a block that will evaluate in the far future, so we cannot learn any value from it. 
      // As such, you cannot ask "what is the current rotation state" and get an answer.
      // So instead, I'm punting "pick one of these please" to the rotator function,
      // from there it can read the display state (it has t o anyway), pick a new rotation, and apply.
      this.connect('clicked', () => {
       Rotator.rotate_to_either(0,3);
      });
    }

    _onItemActivate(item) {
      item.setOrnament(PopupMenu.Ornament.CHECK);
    }
});

