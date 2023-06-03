import { PluginOption } from "vite";
import path from "path";
import fs from "fs";

const publicDir = path.resolve(__dirname, "./public");

const manifestConfig = (projectVersion: string): chrome.runtime.ManifestV3 => {
  return {
    manifest_version: 3,

    name: "Assistant",
    version: projectVersion,
    description: "Assistant",

    icons: {
      "16": "logo.png",
      "32": "logo.png",
      "48": "logo.png",
      "128": "logo.png",
    },

    content_scripts: [
      {
        js: ["content/index.js"],
        matches: ["<all_urls>"], // TODO limit only for specific site
        exclude_matches: ["*://localhost:*/*"], // ! Exclude localhost when developing
      },
    ],
    action: {
      default_icon: "logo.png",
      default_title: "Assistant",
    },
    options_page: "setting.html",

    background: {
      service_worker: "service/index.js",
    },
    host_permissions: ["http://*/*", "https://*/*"],
    permissions: ["scripting", "tabs"],

    web_accessible_resources: [
      {
        resources: ["assets/js/*.js", "assets/css/*.css", "logo.png"],
        matches: ["*://*/*"],
      },
    ],
  };
};

function vitePlugin(projectVersion: string): PluginOption {
  function makeManifest(to: string) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const manifestPath = path.resolve(to, "manifest.json");

    fs.writeFileSync(
      manifestPath,
      JSON.stringify(manifestConfig(projectVersion), null, 2)
    );
  }

  return {
    name: "manifest",
    buildStart() {
      makeManifest(publicDir);
    },
  };
}

export default vitePlugin;
