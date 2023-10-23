/* Determine if gnome-shell version newer than required
 * Written by Sergey
*/

import { log } from './logging';
// @ts-ignore
import * as Config from 'resource:///org/gnome/shell/misc/config.js';

interface ConfigObject {
    PACKAGE_VERSION: string;
}

interface Version {
    major: number;
    minor: number;
}

/**
 * ShellVersion is used to parse the version string
 */
export class ShellVersion {
    readonly major: number;
    readonly minor: number;
    private readonly rawVersion: string;
    
    private constructor(version: string) {
        const parts = version.split('.').map((part) => Number(part));
        if (parts.length < 2) {
            throw new Error(`invalid version supplied: ${version}`);
        }
        this.major = parts[0];
        this.minor = parts[1];
        // Tolerate "40.alpha.1" for example. See https://github.com/gTile/gTile/issues/187.
        if (isNaN(this.minor)) {
            this.minor = 0;
        }
        if (isNaN(this.major)) {
            throw new Error(`invalid version supplied: ${JSON.stringify(version)}; got major = ${this.major}, minor = ${this.minor}`);
        }
        this.rawVersion = version;
    }

    public static defaultVersion(): ShellVersion {
        let config: ConfigObject = Config;
        return ShellVersion.parse(config.PACKAGE_VERSION);
    }

    public static parse(version: string): ShellVersion {
        return new ShellVersion(version);
    }

    print_version  () {
        log("Init gnome-shell version " + this.rawVersion + " major " + this.major + " minor " + this.minor);
    }
};

/**
 * Returns true if a is >= b.
 */
function versionGreaterThanOrEqualTo(a: Version, b: Version): boolean {
    return a.major > b.major || (a.major === b.major && a.minor >= b.minor);
}
