import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useId,
} from "react";

class EventBus {
  private isChrome = Boolean(chrome.runtime?.onMessage);
  private listeners: Map<string, (message: unknown) => void> = new Map();

  constructor() {
    if (this.isChrome) {
      chrome.runtime.onMessage.addListener((message) => {
        this.listeners.forEach((listener) => {
          try {
            listener(message);
          } catch (error) {
            console.error(error);
          }
        });
      });
    }
  }

  emit(message: unknown) {
    if (this.isChrome) {
      chrome.runtime.sendMessage(message);
    } else {
      this.listeners.forEach((listener) => listener(message));
    }
  }

  listen(id: string, listener: (message: unknown) => void) {
    this.listeners.set(id, listener);
  }

  cancel(id: string) {
    this.listeners.delete(id);
  }
}

const bus = new EventBus();

const Context = createContext({ bus });

function RuntimeEventBridge(props: PropsWithChildren) {
  return <Context.Provider value={{ bus }}>{props.children}</Context.Provider>;
}

export function RuntimeEventListeners(
  props: PropsWithChildren<{ callback: (message: unknown) => void }>
) {
  const id = useId();
  const { bus } = useContext(Context);

  useEffect(() => {
    bus.listen(id, props.callback);
    return () => {
      bus.cancel(id);
    };
  }, [bus, id, props.callback]);

  return <>{props.children}</>;
}

export function RuntimeEventEmitter(props: {
  children: (emit: (message: unknown) => void) => ReactNode;
}) {
  const { bus } = useContext(Context);

  function emit(message: unknown) {
    bus.emit(message);
  }

  return <>{props.children(emit)}</>;
}

export default RuntimeEventBridge;
