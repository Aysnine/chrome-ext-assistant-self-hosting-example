import { PluginOption } from "vite";
import path from "path";
import fs from "fs";

const publicDir = path.resolve(__dirname, "./public");

const manifestJson = (info: {
  version: string;
  appId: string;
  hostBaseUrl: string;
}): chrome.runtime.ManifestV3 => {
  const projectVersion = info.version;

  return {
    manifest_version: 3,

    name: "Assistant",
    version: projectVersion,
    description: "Assistant --- Self Hosting",

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

    update_url: `${info.hostBaseUrl}manifest.xml`,
  };
};

function vitePlugin(info: {
  version: string;
  appId: string;
  hostBaseUrl: string;
}): PluginOption {
  function makeManifest(to: string) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }

    const manifestJsonPath = path.resolve(to, "manifest.json");
    fs.writeFileSync(
      manifestJsonPath,
      JSON.stringify(manifestJson(info), null, 2)
    );

    const manifestXmlPath = path.resolve(to, "manifest.xml");
    fs.writeFileSync(
      manifestXmlPath,
      `<?xml version="1.0" encoding="UTF-8"?>
<gupdate xmlns="http://www.google.com/update2/response" protocol="2.0">
  <app appid="${info.appId}">
    <updatecheck codebase="${info.hostBaseUrl}download.crx" version="${info.version}" />
  </app>
</gupdate>`
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
