import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocalization } from "localization-gen-react-adapter";
import * as React from "react";
// ─── helpers ──────────────────────────────────────────────────────────────────
function Row({ label, value }) {
    return (_jsxs("tr", { children: [_jsx("td", { style: { color: "#888", paddingRight: 16, whiteSpace: "nowrap", verticalAlign: "top" }, children: label }), _jsx("td", { style: { wordBreak: "break-all" }, children: value || _jsx("em", { style: { color: "#bbb" }, children: "(empty)" }) })] }));
}
function Section({ title, children }) {
    return (_jsxs("section", { style: { marginBottom: 32 }, children: [_jsx("h2", { style: {
                    fontSize: 14,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: "#555",
                    margin: "0 0 8px"
                }, children: title }), _jsx("table", { style: { borderCollapse: "collapse", width: "100%" }, children: children })] }));
}
// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
    const fallbackByKey = React.useMemo(() => ({
        "common.app_title": "App",
        "common.app_powered": "Powered by localization-gen",
        "auth.strings.login_title": "Login",
        "auth.consent.privacy_policy": "Privacy policy not available",
        "auth.consent.terms_conditions": "Terms not available",
        "home.strings.home_title": "Home",
        "home.strings.headline": "Welcome",
        "settings.strings.settings_title": "Settings",
        "settings.strings.privacy_title": "Privacy",
        "settings.title": "Settings",
        "settings.preferences.language": "Language",
        "http.http_404_title": "Not Found",
        "http.http_404_message": "The requested resource was not found",
        "fallback.fb500_h": "Technical Issue",
        "fallback.fb500_d": "Please try again in a moment",
        "fallback.support_label": "Contact support"
    }), []);
    const { locale, setLocale, manifest, translate, format, plural, gender, context, entriesForLocale } = useLocalization({
        fallback: fallbackByKey
    });
    const allMergedEntries = entriesForLocale;
    const [mergedQuery, setMergedQuery] = React.useState("");
    const [debouncedMergedQuery, setDebouncedMergedQuery] = React.useState("");
    const [mergedPage, setMergedPage] = React.useState(1);
    const [mergedPageSize, setMergedPageSize] = React.useState(50);
    React.useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebouncedMergedQuery(mergedQuery);
        }, 300);
        return () => window.clearTimeout(timeoutId);
    }, [mergedQuery]);
    const filteredMergedEntries = React.useMemo(() => {
        const q = debouncedMergedQuery.trim().toLowerCase();
        if (!q) {
            return allMergedEntries;
        }
        return allMergedEntries.filter(([key, value]) => key.toLowerCase().includes(q) || value.toLowerCase().includes(q));
    }, [allMergedEntries, debouncedMergedQuery]);
    const mergedTotalPages = Math.max(1, Math.ceil(filteredMergedEntries.length / mergedPageSize));
    const pagedMergedEntries = React.useMemo(() => {
        const start = (mergedPage - 1) * mergedPageSize;
        return filteredMergedEntries.slice(start, start + mergedPageSize);
    }, [filteredMergedEntries, mergedPage, mergedPageSize]);
    React.useEffect(() => {
        setMergedPage(1);
    }, [locale, debouncedMergedQuery, mergedPageSize]);
    React.useEffect(() => {
        if (mergedPage > mergedTotalPages) {
            setMergedPage(mergedTotalPages);
        }
    }, [mergedPage, mergedTotalPages]);
    return (_jsxs("main", { style: { fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }, children: [_jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 24 }, children: [manifest.locales.map((l) => (_jsx("button", { type: "button", onClick: () => setLocale(l), style: { fontWeight: locale === l ? "bold" : "normal", padding: "4px 12px", cursor: "pointer" }, children: l.toUpperCase() }, l))), _jsxs("span", { style: { alignSelf: "center", color: "#555" }, children: ["Active locale: ", _jsx("strong", { children: locale })] })] }), _jsxs(Section, { title: "(1) Common merged keys", children: [_jsx(Row, { label: "common.app_title", value: translate("common.app_title") }), _jsx(Row, { label: "common.app_powered", value: translate("common.app_powered") })] }), _jsxs(Section, { title: "(2) Auth detailed + merged keys", children: [_jsx(Row, { label: "auth.strings.login_title", value: translate("auth.strings.login_title") }), _jsx(Row, { label: "auth.placeholders.welcome_back", value: format("auth.placeholders.welcome_back", { name: "Alfin" }) }), _jsx(Row, { label: "auth.placeholders.otp_sent", value: format("auth.placeholders.otp_sent", { phone: "+62-812-0000-1111", expires_in: "01:30" }) }), _jsx(Row, { label: "auth.structured.lock_message(3)", value: plural("auth.structured.lock_message", 3) }), _jsx(Row, { label: "auth.structured.channel_label(email)", value: context("auth.structured.channel_label", "email") }), _jsx(Row, { label: "auth.structured.account_title(other)", value: gender("auth.structured.account_title", "other", { last_name: "Doe" }) }), _jsx(Row, { label: "auth.consent.privacy_policy (preview)", value: translate("auth.consent.privacy_policy").slice(0, 120) + "..." }), _jsx(Row, { label: "auth.consent.terms_conditions (preview)", value: translate("auth.consent.terms_conditions").slice(0, 120) + "..." })] }), _jsxs(Section, { title: "(3) Home detailed keys", children: [_jsx(Row, { label: "home.strings.home_title", value: translate("home.strings.home_title") }), _jsx(Row, { label: "home.strings.headline", value: translate("home.strings.headline") }), _jsx(Row, { label: "home.placeholders.greeting_time", value: format("home.placeholders.greeting_time", { time_of_day: "morning", name: "Alfin" }) }), _jsx(Row, { label: "home.placeholders.stats_summary", value: format("home.placeholders.stats_summary", { tasks: 4, points: 120 }) }), _jsx(Row, { label: "home.structured.notifications(2)", value: plural("home.structured.notifications", 2) }), _jsx(Row, { label: "home.structured.banner(retention)", value: context("home.structured.banner", "retention") }), _jsx(Row, { label: "home.structured.host_title(female)", value: gender("home.structured.host_title", "female", { last_name: "Rahma" }) })] }), _jsxs(Section, { title: "(4) Settings detailed + legacy keys", children: [_jsx(Row, { label: "settings.strings.settings_title", value: translate("settings.strings.settings_title") }), _jsx(Row, { label: "settings.strings.privacy_title", value: translate("settings.strings.privacy_title") }), _jsx(Row, { label: "settings.placeholders.auto_lock_minutes", value: format("settings.placeholders.auto_lock_minutes", { minutes: 10 }) }), _jsx(Row, { label: "settings.placeholders.region_value", value: format("settings.placeholders.region_value", { region: "APAC" }) }), _jsx(Row, { label: "settings.structured.devices(1)", value: plural("settings.structured.devices", 1) }), _jsx(Row, { label: "settings.structured.backup_status(synced)", value: context("settings.structured.backup_status", "synced") }), _jsx(Row, { label: "settings.structured.owner_label(male)", value: gender("settings.structured.owner_label", "male", { last_name: "Wijaya" }) }), _jsx(Row, { label: "settings.title (legacy)", value: translate("settings.title") }), _jsx(Row, { label: "settings.preferences.language (legacy)", value: translate("settings.preferences.language") })] }), _jsxs(Section, { title: "(5) HTTP + Fallback merged keys", children: [_jsx(Row, { label: "http.http_404_title", value: translate("http.http_404_title") }), _jsx(Row, { label: "http.http_404_message", value: translate("http.http_404_message") }), _jsx(Row, { label: "fallback.fb500_h", value: translate("fallback.fb500_h") }), _jsx(Row, { label: "fallback.fb500_d", value: translate("fallback.fb500_d") }), _jsx(Row, { label: "fallback.support_label", value: translate("fallback.support_label") })] }), _jsxs(Section, { title: "(6) All merged keys from active locale", children: [_jsx("tr", { children: _jsx("td", { style: { paddingBottom: 12 }, colSpan: 2, children: _jsxs("div", { style: {
                                    position: "sticky",
                                    top: 0,
                                    background: "#fff",
                                    padding: "8px 0",
                                    zIndex: 1,
                                    display: "flex",
                                    gap: 8,
                                    flexWrap: "wrap",
                                    alignItems: "center"
                                }, children: [_jsx("input", { type: "text", value: mergedQuery, onChange: (e) => setMergedQuery(e.target.value), placeholder: "Search key or value...", style: { padding: "6px 8px", minWidth: 260 } }), _jsx("select", { value: mergedPageSize, onChange: (e) => setMergedPageSize(Number(e.target.value)), style: { padding: "6px 8px" }, children: [25, 50, 100].map((size) => (_jsxs("option", { value: size, children: [size, " / page"] }, size))) }), _jsx("button", { type: "button", onClick: () => setMergedPage(1), disabled: mergedPage <= 1, style: { padding: "6px 10px" }, children: "First" }), _jsx("button", { type: "button", onClick: () => setMergedPage((p) => Math.max(1, p - 1)), disabled: mergedPage <= 1, style: { padding: "6px 10px" }, children: "Prev" }), _jsx("button", { type: "button", onClick: () => setMergedPage((p) => Math.min(mergedTotalPages, p + 1)), disabled: mergedPage >= mergedTotalPages, style: { padding: "6px 10px" }, children: "Next" }), _jsx("button", { type: "button", onClick: () => setMergedPage(mergedTotalPages), disabled: mergedPage >= mergedTotalPages, style: { padding: "6px 10px" }, children: "Last" }), _jsxs("span", { style: { color: "#666" }, children: [filteredMergedEntries.length, " matched of ", allMergedEntries.length, " total - page ", mergedPage, "/", mergedTotalPages] })] }) }) }), pagedMergedEntries.map(([key, value]) => (_jsx(Row, { label: key, value: value }, key)))] })] }));
}
//# sourceMappingURL=App.js.map