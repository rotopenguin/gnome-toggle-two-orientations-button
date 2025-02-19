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
        toggleMode: true,
      });

      this.menu.setHeader('object-rotate-left-symbolic', 'Screen Rotate');

      this.connect('clicked', () => {
        const transform = Rotator.whats_our_current_transform();
        console.log("Orientation here, in MenuToggle. I think the orientation is:", transform);
        if (this.checked === true) {
            Rotator.rotate_to(0); //would love to have a functional prefs.js telling this what to do! 
        } else {
            Rotator.rotate_to(3);
        }
      });
    }

    _onItemActivate(item) {
      item.setOrnament(PopupMenu.Ornament.CHECK);
    }
});

