import { useContext } from "react";
import { LocalizationContext } from "../provider/LocalizationProvider.js";

/**
 * Returns the current localization context from `LocalizationProvider`.
 *
 * @throws Error when called outside `LocalizationProvider`.
 */
export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within LocalizationProvider.");
  }
  return context;
}
