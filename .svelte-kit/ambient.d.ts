
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const LSCOLORS: string;
	export const DB_PASSWORD: string;
	export const CAML_LD_LIBRARY_PATH: string;
	export const WINDOWID: string;
	export const NVM_RC_VERSION: string;
	export const npm_config_userconfig: string;
	export const OCAML_TOPLEVEL_PATH: string;
	export const COLORTERM: string;
	export const npm_config_cache: string;
	export const npm_package_dev_optional: string;
	export const XDG_SESSION_PATH: string;
	export const FLY_API_TOKEN: string;
	export const DATABASE_URL: string;
	export const PKG_CONFIG_PATH: string;
	export const npm_package_integrity: string;
	export const HISTSIZE: string;
	export const BASH_IT: string;
	export const I3SOCK: string;
	export const NODE: string;
	export const LC_ADDRESS: string;
	export const SSH_AUTH_SOCK: string;
	export const XDG_CONFIG_HOME: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const LIBVA_DRIVER_NAME: string;
	export const GNUPGHOME: string;
	export const DESKTOP_SESSION: string;
	export const LC_MONETARY: string;
	export const SSH_AGENT_PID: string;
	export const KITTY_PID: string;
	export const MOZ_DBUS_REMOTE: string;
	export const npm_config_globalconfig: string;
	export const _printf_cmd: string;
	export const EDITOR: string;
	export const GTK_MODULES: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const NIX_PROFILES: string;
	export const LOGNAME: string;
	export const XDG_SESSION_DESKTOP: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const XDG_SESSION_TYPE: string;
	export const DSSI_PATH: string;
	export const MANPATH: string;
	export const npm_package_dev: string;
	export const npm_config_init_module: string;
	export const CXX: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const DESKTOP_STARTUP_ID: string;
	export const KITTY_PUBLIC_KEY: string;
	export const FZF_DEFAULT_COMMAND: string;
	export const OPAM_SWITCH_PREFIX: string;
	export const XDG_GREETER_DATA_DIR: string;
	export const MOTD_SHOWN: string;
	export const GIT_HOSTING: string;
	export const DB_USER: string;
	export const HOME: string;
	export const npm_package_peer: string;
	export const LC_PAPER: string;
	export const LANG: string;
	export const VST_PATH: string;
	export const HISTFILE: string;
	export const LS_COLORS: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const NIX_SSL_CERT_FILE: string;
	export const npm_package_resolved: string;
	export const KITTY_WINDOW_ID: string;
	export const XDG_SEAT_PATH: string;
	export const AWS_SECRET_ACCESS_KEY: string;
	export const YAOURT_COLORS: string;
	export const DOCKER_BUILDKIT: string;
	export const CARGO_BUILD_JOBS: string;
	export const INIT_CWD: string;
	export const POSTGRES_BIN: string;
	export const npm_lifecycle_script: string;
	export const NVM_DIR: string;
	export const npm_package_optional: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const TERMINFO: string;
	export const npm_package_name: string;
	export const GTK_OVERLAY_SCROLLING: string;
	export const npm_config_prefix: string;
	export const USER: string;
	export const FLASK_APP: string;
	export const FZF_CTRL_T_OPTS: string;
	export const BASH_IT_THEME: string;
	export const VISUAL: string;
	export const PYTHON_KEYRING_BACKEND: string;
	export const DISPLAY: string;
	export const RUSTC_WRAPPER: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const NVM_CD_FLAGS: string;
	export const AWS_ACCESS_KEY_ID: string;
	export const LC_MESSAGES: string;
	export const LC_MEASUREMENT: string;
	export const XDG_VTNR: string;
	export const DBUS_SESSION_BUS_PID: string;
	export const XDG_SESSION_ID: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const MOZ_PLUGIN_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const MKLROOT: string;
	export const PGVERSION: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_json: string;
	export const LC_TIME: string;
	export const DOCKER_HOST: string;
	export const CUDA_HOME: string;
	export const XDG_DATA_DIRS: string;
	export const npm_config_noproxy: string;
	export const BROWSER: string;
	export const ALTERNATE_EDITOR: string;
	export const SSH_AGENT_ENV: string;
	export const PATH: string;
	export const npm_config_metrics_registry: string;
	export const npm_config_node_gyp: string;
	export const GDMSESSION: string;
	export const CC: string;
	export const HISTFILESIZE: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const KEYS_AUTH: string;
	export const LV2_PATH: string;
	export const npm_config_global_prefix: string;
	export const MAIL: string;
	export const KITTY_INSTALLATION_DIR: string;
	export const npm_node_execpath: string;
	export const OLDPWD: string;
	export const npm_package_engines_node: string;
	export const LADSPA_PATH: string;
	export const CADENCE_AUTO_STARTED: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		LSCOLORS: string;
		DB_PASSWORD: string;
		CAML_LD_LIBRARY_PATH: string;
		WINDOWID: string;
		NVM_RC_VERSION: string;
		npm_config_userconfig: string;
		OCAML_TOPLEVEL_PATH: string;
		COLORTERM: string;
		npm_config_cache: string;
		npm_package_dev_optional: string;
		XDG_SESSION_PATH: string;
		FLY_API_TOKEN: string;
		DATABASE_URL: string;
		PKG_CONFIG_PATH: string;
		npm_package_integrity: string;
		HISTSIZE: string;
		BASH_IT: string;
		I3SOCK: string;
		NODE: string;
		LC_ADDRESS: string;
		SSH_AUTH_SOCK: string;
		XDG_CONFIG_HOME: string;
		COLOR: string;
		npm_config_local_prefix: string;
		LIBVA_DRIVER_NAME: string;
		GNUPGHOME: string;
		DESKTOP_SESSION: string;
		LC_MONETARY: string;
		SSH_AGENT_PID: string;
		KITTY_PID: string;
		MOZ_DBUS_REMOTE: string;
		npm_config_globalconfig: string;
		_printf_cmd: string;
		EDITOR: string;
		GTK_MODULES: string;
		XDG_SEAT: string;
		PWD: string;
		NIX_PROFILES: string;
		LOGNAME: string;
		XDG_SESSION_DESKTOP: string;
		QT_QPA_PLATFORMTHEME: string;
		XDG_SESSION_TYPE: string;
		DSSI_PATH: string;
		MANPATH: string;
		npm_package_dev: string;
		npm_config_init_module: string;
		CXX: string;
		_: string;
		XAUTHORITY: string;
		DESKTOP_STARTUP_ID: string;
		KITTY_PUBLIC_KEY: string;
		FZF_DEFAULT_COMMAND: string;
		OPAM_SWITCH_PREFIX: string;
		XDG_GREETER_DATA_DIR: string;
		MOTD_SHOWN: string;
		GIT_HOSTING: string;
		DB_USER: string;
		HOME: string;
		npm_package_peer: string;
		LC_PAPER: string;
		LANG: string;
		VST_PATH: string;
		HISTFILE: string;
		LS_COLORS: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		NIX_SSL_CERT_FILE: string;
		npm_package_resolved: string;
		KITTY_WINDOW_ID: string;
		XDG_SEAT_PATH: string;
		AWS_SECRET_ACCESS_KEY: string;
		YAOURT_COLORS: string;
		DOCKER_BUILDKIT: string;
		CARGO_BUILD_JOBS: string;
		INIT_CWD: string;
		POSTGRES_BIN: string;
		npm_lifecycle_script: string;
		NVM_DIR: string;
		npm_package_optional: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		TERMINFO: string;
		npm_package_name: string;
		GTK_OVERLAY_SCROLLING: string;
		npm_config_prefix: string;
		USER: string;
		FLASK_APP: string;
		FZF_CTRL_T_OPTS: string;
		BASH_IT_THEME: string;
		VISUAL: string;
		PYTHON_KEYRING_BACKEND: string;
		DISPLAY: string;
		RUSTC_WRAPPER: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		NVM_CD_FLAGS: string;
		AWS_ACCESS_KEY_ID: string;
		LC_MESSAGES: string;
		LC_MEASUREMENT: string;
		XDG_VTNR: string;
		DBUS_SESSION_BUS_PID: string;
		XDG_SESSION_ID: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		MOZ_PLUGIN_PATH: string;
		XDG_RUNTIME_DIR: string;
		MKLROOT: string;
		PGVERSION: string;
		DEBUGINFOD_URLS: string;
		npm_package_json: string;
		LC_TIME: string;
		DOCKER_HOST: string;
		CUDA_HOME: string;
		XDG_DATA_DIRS: string;
		npm_config_noproxy: string;
		BROWSER: string;
		ALTERNATE_EDITOR: string;
		SSH_AGENT_ENV: string;
		PATH: string;
		npm_config_metrics_registry: string;
		npm_config_node_gyp: string;
		GDMSESSION: string;
		CC: string;
		HISTFILESIZE: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		KEYS_AUTH: string;
		LV2_PATH: string;
		npm_config_global_prefix: string;
		MAIL: string;
		KITTY_INSTALLATION_DIR: string;
		npm_node_execpath: string;
		OLDPWD: string;
		npm_package_engines_node: string;
		LADSPA_PATH: string;
		CADENCE_AUTO_STARTED: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
