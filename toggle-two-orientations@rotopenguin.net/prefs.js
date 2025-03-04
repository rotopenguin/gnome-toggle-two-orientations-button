/* prefs.js
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

//shamelessly stolen from Weather O'Clock's prefs

"use strict";

import Gtk from "gi://Gtk";
import Gio from "gi://Gio";
import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";


export default class MyPreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    console.log("Orientation: Did we get to prefs.js yet??? "); 
    //is the problem that the ui won't load without a <title> tag on the AdwPreferencesPage (or AdwPreferencesGroup)? None of this shit is documented it's all stupid.
    window._settings = this.getSettings();
    window.set_default_size(360, 300);

    const builder = new Gtk.Builder();
    
    builder.add_from_file(`${this.path}/prefs dialog.ui`);
   

   /* const toggleA = builder.get_object("orientation-a");
    toggleA.set_active(window._settings.get_boolean("orientation-a"));

    window._settings.bind(
      "orientation-a",
      toggleA,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );
*/
    const page = builder.get_object("MainPage");
    window.add(page);
  }

}



/* //ugh I give up
  getPreferencesWidget() {
    const builder = new Gtk.Builder();
    builder.add_from_file(`${this.path}/prefs dialog.ui`);
    const page = builder.get_object("MainPage");
    page._settings=this.getSettings();

    const orientation_a = builder.get_object("orientation-a");
    orientation_a.set_active(page._settings.get_boolean("orientation-a"));
    page._settings.bind(
      "orientation-a",
      orientation_a,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );

    const orientation_b = builder.get_object("orientation-b");
    orientation_b.set_active(page._settings.get_boolean("orientation-b"));
    page._settings.bind(
      "orientation-b",
      orientation_b,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );

    console.log("Orientation prefs Page is ", page);
    return page;
  }
}
*/


/*
import Adw from 'gi://Adw';
import GObject from 'gi://GObject';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const MyPreferencesWidget = GObject.registerClass(
class MyPreferencesWidget extends Adw.PreferencesGroup {
    constructor() {
        super({
            title: _('Section'),
        });

        this.add(new Adw.SwitchRow({
            title: _('Title'),
            subtitle: _('Subtitle'),
            active: true,
        }));
    }
});

export default class MyPreferences extends ExtensionPreferences {
    getPreferencesWidget() {
        return new MyPreferencesWidget();
    }
} 

*/