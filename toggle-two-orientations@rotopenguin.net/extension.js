/* extension.js
 * Copyright 2025 Rotopenguin
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import Gio from 'gi://Gio';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import { ManualOrientationIndicator } from './manualOrientationIndicator.js';
export let all_the_settings;

//import * as Rotator from './rotator.js'
export default class ToggleTwoOrientationsExtension extends Extension {
    enable() {
            this.flipIndicator = new ManualOrientationIndicator(this);
            Main.panel.statusArea.quickSettings.addExternalIndicator(this.flipIndicator);
            all_the_settings = this.getSettings("org.gnome.shell.extensions.toggle-two-orientations");  //afaict, this is creating a real Gio_Settings{}
            //this._settings.get_boolean("orientation-a"));
        
    }

    disable() {

        if (this.flipIndicator !== null && this.flipIndicator !== undefined) {
            this.flipIndicator.destroy();
            this.flipIndicator = null;
        }
        //this._settings=null; //Apparently, _settings was destroyed before disable was called. I guess. 
    }



}


