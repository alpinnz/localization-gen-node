import { createContext, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import type { RuntimeManifest } from "localization-gen-core";
import { createReactLocalizationStore, type ReactLocalizationStore } from "../bridge/create-react-localization-store.js";

/**
 * React context value exposed by `LocalizationProvider`.
 */
export interface LocalizationContextValue {
  /** Active locale currently used for runtime resolution. */
  locale: string;
  /** Updates active locale for all consumers under the provider. */
  setLocale: (locale: string) => void;
  /** Runtime store with `t()` and locale utilities. */
  store: ReactLocalizationStore;
  /** Generated runtime manifest used as source of truth. */
  manifest: RuntimeManifest;
}

/**
 * Internal React context consumed by `useLocalization`.
 */
export const LocalizationContext = createContext<LocalizationContextValue | null>(null);

/**
 * Provides localization state and runtime store to React subtree.
 *
 * @param manifest Generated runtime manifest from localization-gen output.
 * @param initialLocale Optional initial locale.
 * @param children React subtree that can consume localization hooks.
 */
export default function LocalizationProvider({
  manifest,
  initialLocale,
  children
}: PropsWithChildren<{ manifest: RuntimeManifest; initialLocale?: string }>) {
  const [locale, setLocale] = useState(initialLocale ?? manifest.base_locale);

  const value = useMemo(() => {
    const store = createReactLocalizationStore(manifest, locale);
    return {
      locale,
      setLocale,
      store,
      manifest
    };
  }, [locale, manifest]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}
