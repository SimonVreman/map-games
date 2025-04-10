import { useEffect, useState } from "react";
import { useBoundAppStore } from "../store/provider";
import { AppStore } from "../store";

export function useOnStoreHydrated(fn: (state: AppStore) => void) {
  const [didRun, setDidRun] = useState(false);
  const store = useBoundAppStore();

  useEffect(() => {
    if (didRun) return;
    setDidRun(true);

    console.log("on store hydrate");

    const hasHydrated = store.persist.hasHydrated();

    // Add listener if not hydrated yet, otherwise run the function immediately
    if (!hasHydrated) return store.persist.onFinishHydration(fn);
    else fn(store.getState());
  }, [store, fn, didRun]);
}
