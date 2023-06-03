import React from "react";
import ReactDOM from "react-dom/client";
import RuntimeEventBridge from "./components/RuntimeEventBridge";
import {
  createCache as antdCreateCache,
  StyleProvider,
} from "@ant-design/cssinjs";
import createCache from "@emotion/cache";
import App from "./injectApp/App.tsx";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { CacheProvider } from "@emotion/react";

const INJECT_ROOT_ID =
  "assistant-root" + // ! UPDATE ME
  (import.meta.env.MODE === "development" ? "-dev" : "");

const root = injectShadowRoot().shadowRoot;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RuntimeEventBridge>
      <ConfigProvider
        locale={zhCN}
        getPopupContainer={() => root as unknown as HTMLElement}
        getTargetContainer={() => root as unknown as HTMLElement}
      >
        <StyleProvider container={root} cache={antdCreateCache()}>
          <CacheProvider
            value={createCache({
              container: root,
              key: "react-shadow",
            })}
          >
            <App />
          </CacheProvider>
        </StyleProvider>
      </ConfigProvider>
    </RuntimeEventBridge>
  </React.StrictMode>
);

function injectShadowRoot() {
  const rawRoot = (() => {
    const root = document.getElementById(`#${INJECT_ROOT_ID}`);

    if (!root) {
      const container = document.createElement("div");
      container.id = INJECT_ROOT_ID;
      container.style.setProperty("position", "absolute");
      container.style.setProperty("width", "0");
      container.style.setProperty("height", "0");
      container.style.setProperty("margin", "0");
      container.style.setProperty("padding", "0");
      document.body.appendChild(container);

      return container;
    }

    return root;
  })();

  rawRoot.innerHTML = "";

  const shadowRoot =
    rawRoot instanceof ShadowRoot
      ? rawRoot
      : rawRoot.attachShadow({ mode: "open" });

  return { rawRoot, shadowRoot };
}
