/* rotator.js
*
* Copyright (C) 2022  kosmospredanie, shyzus
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
import Gio from 'gi://Gio';

import { DisplayConfigState } from './displayConfigState.js'
import { all_the_settings } from './extension.js';
export let orientation_a,orientation_b;

const connection = Gio.DBus.session;

export const Methods = Object.freeze({
  'verify': 0,
  'temporary': 1,
  'persistent': 2
});

export function call_dbus_method(method, handler, params = null) {
  if (handler !== undefined || handler !== null) {
    connection.call(
      'org.gnome.Mutter.DisplayConfig',
      '/org/gnome/Mutter/DisplayConfig',
      'org.gnome.Mutter.DisplayConfig',
      method,
      params,
      null,
      Gio.DBusCallFlags.NONE,
      -1,
      null, handler);
  } else {
    connection.call(
      'org.gnome.Mutter.DisplayConfig',
      '/org/gnome/Mutter/DisplayConfig',
      'org.gnome.Mutter.DisplayConfig',
      method,
      params,
      null,
      Gio.DBusCallFlags.NONE,
      -1,
      null);
  }

}

export function get_state() {
  return new Promise((resolve, reject) => {
    call_dbus_method('GetCurrentState', (conn, res) => {
      try {
        let reply = conn.call_finish(res);
        let configState = new DisplayConfigState(reply)
        resolve(configState);
      } catch (err) {
        reject(err);
      }

    });
  })
}

export function rotate_to(transform) {
  this.get_state().then(state => {
    let target_monitor = state.builtin_monitor;
    if (target_monitor === undefined) {
      target_monitor = state.monitors[0]
    }
    let logical_monitor = state.get_logical_monitor_for(target_monitor.connector);
    console.log("Orientation here, in rotate_to. I think transform is ", logical_monitor.transform);
    logical_monitor.transform = transform;
    let variant = state.pack_to_apply(this.Methods['temporary']);
    call_dbus_method('ApplyMonitorsConfig', null, variant);
  }).catch(err => {
    console.error(err);
  })
}

export function rotate_to_either(orientation_a, orientation_b) {
  const oA= all_the_settings.get_boolean("orientation-a");
  const oB= all_the_settings.get_boolean("orientation-b");
  console.log("Orientation: rotator sees ",oA, oB);
  this.get_state().then(state => {
    let target_monitor = state.builtin_monitor;
    if (target_monitor === undefined) {
      target_monitor = state.monitors[0]
    }
    let logical_monitor = state.get_logical_monitor_for(target_monitor.connector);
    const current_transform = logical_monitor.transform;
    let target_transform;
    console.log("Orientation here, in rotate_to_either. I think transform is ", current_transform);
    if (current_transform == orientation_a) {
      target_transform=orientation_b;
    } else {
      target_transform=orientation_a;
    }

    logical_monitor.transform = target_transform;
    let variant = state.pack_to_apply(this.Methods['temporary']);
    call_dbus_method('ApplyMonitorsConfig', null, variant);
  }).catch(err => {
    console.error(err);
  })
}
