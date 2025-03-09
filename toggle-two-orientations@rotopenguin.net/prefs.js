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
    window._settings = this.getSettings();
    window.set_default_size(360, 300);

    const builder = new Gtk.Builder();
    
    builder.add_from_file(`${this.path}/prefs.ui`);
   

   const toggleA = builder.get_object("orientation-a");
    toggleA.set_active(window._settings.get_boolean("orientation-a"));

    window._settings.bind(
      "orientation-a",
      toggleA,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );

    const toggleB = builder.get_object("orientation-b");
    toggleB.set_active(window._settings.get_boolean("orientation-b"));

    window._settings.bind(
      "orientation-b",
      toggleB,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );


    const page = builder.get_object("MainPage");
    window.add(page);
  }

}

