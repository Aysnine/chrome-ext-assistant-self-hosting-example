import { useEffect, useState } from "react";
import {
  RuntimeEventEmitter,
  RuntimeEventListeners,
} from "../components/RuntimeEventBridge";
import { Button, Layout, Space, Tabs, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Global } from "@emotion/react";
import logo from "../assets/logo.png";

import AppStyle from "./App.css?inline";
import { css } from "@emotion/react";

const styles = css(AppStyle);

function App() {
  const [sideAppEnable, setSideAppEnable] = useState(
    // ! for fast review
    import.meta.env.MODE === "development"
  );

  return (
    <RuntimeEventListeners
      callback={(message: unknown) => {
        if (typeof message === "object") {
          const messageObj = message as Record<string, unknown>;
          if (messageObj.type === "TOGGLE_SIDEBAR") {
            setSideAppEnable((v) => !v);
          }
        }
      }}
    >
      <Global styles={styles} />
      {sideAppEnable ? <SideApp /> : null}
    </RuntimeEventListeners>
  );
}

function SideApp() {
  const width = 480;

  useEffect(() => {
    // spacial case for jira
    if (document.getElementById("jira-frontend")) {
      document.documentElement.style.setProperty(
        "--rightPanelWidth",
        `${width}px`
      );

      return () => {
        document.documentElement.style.removeProperty("--rightPanelWidth");
      };
    }

    document.documentElement.style.setProperty(
      "width",
      `calc(100% - ${width}px)`
    );

    return () => {
      document.documentElement.style.removeProperty("width");
    };
  });

  const [tabKey, setTabKey] = useState("1");

  return (
    <Layout className="side-app" style={{ width }}>
      <Layout.Header className="side-app-header">
        <div className="side-app-header-title">
          <img
            src={
              import.meta.env.MODE === "extension"
                ? chrome.runtime.getURL("/logo.png")
                : logo
            }
            alt="logo"
            width={30}
            height={30}
            style={{ marginRight: "8px" }}
          />
          <Typography.Text strong>Assistant</Typography.Text>
        </div>
        <Space>
          <RuntimeEventEmitter>
            {(emit) => (
              <Button
                size="small"
                type="text"
                onClick={() => {
                  emit({ type: "TOGGLE_SIDEBAR" });
                }}
              >
                <CloseOutlined />
              </Button>
            )}
          </RuntimeEventEmitter>
        </Space>
      </Layout.Header>
      <Tabs
        size="small"
        className="side-app-tabs"
        defaultActiveKey={tabKey}
        items={[
          {
            key: "1",
            label: <div style={{ padding: "0 8px" }}>Tab 1</div>,
          },
          {
            key: "2",
            label: <div style={{ padding: "0 8px" }}>Tab 2</div>,
          },
          {
            key: "3",
            label: <div style={{ padding: "0 8px" }}>Tab 3</div>,
          },
        ]}
        onChange={(key) => {
          setTabKey(key);
        }}
      />
      <Layout.Content className="side-app-content">
        {/* ... */}
      </Layout.Content>
    </Layout>
  );
}

export default App;
