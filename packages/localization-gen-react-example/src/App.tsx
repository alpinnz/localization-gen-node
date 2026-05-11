import {useLocalization} from "localization-gen-react-adapter";
import * as React from "react";
import {appLocalization} from "./assets/localizations/app-localization";

// ─── helpers ──────────────────────────────────────────────────────────────────
function Row({label, value}: { label: string; value: string }) {
    return (
        <tr>
            <td style={{color: "#888", paddingRight: 16, whiteSpace: "nowrap", verticalAlign: "top"}}>{label}</td>
            <td style={{wordBreak: "break-all"}}>{value || <em style={{color: "#bbb"}}>{"(empty)"}</em>}</td>
        </tr>
    );
}

function Section({title, children}: { title: string; children: React.ReactNode }) {
    return (
        <section style={{marginBottom: 32}}>
            <h2 style={{
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#555",
                margin: "0 0 8px"
            }}>{title}</h2>
            <table style={{borderCollapse: "collapse", width: "100%"}}>
                <tbody>{children}</tbody>
            </table>
        </section>
    );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
    const {
        locale,
        setLocale,
        manifest,
        translate,
        format,
        plural,
        gender,
        context,
        entriesForLocale
    } = useLocalization({});

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

    return (
        <main style={{fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto"}}>
            {/* locale switcher */}
            <div style={{display: "flex", gap: 8, marginBottom: 24}}>
                {manifest.locales.map((l) => (
                    <button
                        key={l}
                        type="button"
                        onClick={() => setLocale(l)}
                        style={{fontWeight: locale === l ? "bold" : "normal", padding: "4px 12px", cursor: "pointer"}}
                    >
                        {l.toUpperCase()}
                    </button>
                ))}
                <span style={{alignSelf: "center", color: "#555"}}>Active locale: <strong>{locale}</strong></span>
            </div>
            <h1>login.page_title :{translate("login.page_title")}</h1>

            <Section title="(1) Common merged keys">
                <Row label={appLocalization.common.app_title} value={translate(appLocalization.common.app_title)}/>
                <Row label={appLocalization.common.app_powered} value={translate(appLocalization.common.app_powered)}/>
            </Section>

            <Section title="(2) Auth detailed + merged keys">
                <Row label={appLocalization.auth.strings.login_title}
                     value={translate(appLocalization.auth.strings.login_title)}/>
                <Row label={appLocalization.auth.placeholders.welcome_back}
                     value={format(appLocalization.auth.placeholders.welcome_back, {name: "Alfin"})}/>
                <Row label={appLocalization.auth.placeholders.otp_sent}
                     value={format(appLocalization.auth.placeholders.otp_sent, {
                         phone: "+62-812-0000-1111",
                         expires_in: "01:30"
                     })}/>
                <Row label={`${appLocalization.auth.structured.lock_message}(3)`}
                     value={plural(appLocalization.auth.structured.lock_message, 3)}/>
                <Row label={`${appLocalization.auth.structured.channel_label}(email)`}
                     value={context(appLocalization.auth.structured.channel_label, "email")}/>
                <Row label={`${appLocalization.auth.structured.account_title}(other)`}
                     value={gender(appLocalization.auth.structured.account_title, "other", {last_name: "Doe"})}/>
                <Row label={`${appLocalization.auth.consent.privacy_policy} (preview)`}
                     value={translate(appLocalization.auth.consent.privacy_policy).slice(0, 120) + "..."}/>
                <Row label={`${appLocalization.auth.consent.terms_conditions} (preview)`}
                     value={translate(appLocalization.auth.consent.terms_conditions).slice(0, 120) + "..."}/>
            </Section>

            <Section title="(3) Home detailed keys">
                <Row label={appLocalization.home.strings.home_title}
                     value={translate(appLocalization.home.strings.home_title)}/>
                <Row label={appLocalization.home.strings.headline}
                     value={translate(appLocalization.home.strings.headline)}/>
                <Row label={appLocalization.home.placeholders.greeting_time}
                     value={format(appLocalization.home.placeholders.greeting_time, {
                         time_of_day: "morning",
                         name: "Alfin"
                     })}/>
                <Row label={appLocalization.home.placeholders.stats_summary}
                     value={format(appLocalization.home.placeholders.stats_summary, {tasks: 4, points: 120})}/>
                <Row label={`${appLocalization.home.structured.notifications}(2)`}
                     value={plural(appLocalization.home.structured.notifications, 2)}/>
                <Row label={`${appLocalization.home.structured.banner}(retention)`}
                     value={context(appLocalization.home.structured.banner, "retention")}/>
                <Row label={`${appLocalization.home.structured.host_title}(female)`}
                     value={gender(appLocalization.home.structured.host_title, "female", {last_name: "Rahma"})}/>
            </Section>

            <Section title="(4) Settings detailed + legacy keys">
                <Row label={appLocalization.settings.strings.settings_title}
                     value={translate(appLocalization.settings.strings.settings_title)}/>
                <Row label={appLocalization.settings.strings.privacy_title}
                     value={translate(appLocalization.settings.strings.privacy_title)}/>
                <Row label={appLocalization.settings.placeholders.auto_lock_minutes}
                     value={format(appLocalization.settings.placeholders.auto_lock_minutes, {minutes: 10})}/>
                <Row label={appLocalization.settings.placeholders.region_value}
                     value={format(appLocalization.settings.placeholders.region_value, {region: "APAC"})}/>
                <Row label={`${appLocalization.settings.structured.devices}(1)`}
                     value={plural(appLocalization.settings.structured.devices, 1)}/>
                <Row label={`${appLocalization.settings.structured.backup_status}(synced)`}
                     value={context(appLocalization.settings.structured.backup_status, "synced")}/>
                <Row label={`${appLocalization.settings.structured.owner_label}(male)`}
                     value={gender(appLocalization.settings.structured.owner_label, "male", {last_name: "Wijaya"})}/>
                <Row label={`${appLocalization.settings.title} (legacy)`}
                     value={translate(appLocalization.settings.title)}/>
                <Row label={`${appLocalization.settings.preferences.language} (legacy)`}
                     value={translate(appLocalization.settings.preferences.language)}/>
            </Section>

            <Section title="(5) HTTP + Fallback merged keys">
                <Row label={appLocalization.http.http_404_title}
                     value={translate(appLocalization.http.http_404_title)}/>
                <Row label={appLocalization.http.http_404_message}
                     value={translate(appLocalization.http.http_404_message)}/>
                <Row label={appLocalization.fallback.fb500_h} value={translate(appLocalization.fallback.fb500_h)}/>
                <Row label={appLocalization.fallback.fb500_d} value={translate(appLocalization.fallback.fb500_d)}/>
                <Row label={appLocalization.fallback.support_label}
                     value={translate(appLocalization.fallback.support_label)}/>
            </Section>

            <Section title="(6) All merged keys from active locale">
                <tr>
                    <td style={{paddingBottom: 12}} colSpan={2}>
                        <div style={{
                            position: "sticky",
                            top: 0,
                            background: "#fff",
                            padding: "8px 0",
                            zIndex: 1,
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            alignItems: "center"
                        }}>
                            <input
                                type="text"
                                value={mergedQuery}
                                onChange={(e) => setMergedQuery(e.target.value)}
                                placeholder="Search key or value..."
                                style={{padding: "6px 8px", minWidth: 260}}
                            />
                            <select
                                value={mergedPageSize}
                                onChange={(e) => setMergedPageSize(Number(e.target.value))}
                                style={{padding: "6px 8px"}}
                            >
                                {[25, 50, 100].map((size) => (
                                    <option key={size} value={size}>{size} / page</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => setMergedPage(1)}
                                disabled={mergedPage <= 1}
                                style={{padding: "6px 10px"}}
                            >
                                First
                            </button>
                            <button
                                type="button"
                                onClick={() => setMergedPage((p) => Math.max(1, p - 1))}
                                disabled={mergedPage <= 1}
                                style={{padding: "6px 10px"}}
                            >
                                Prev
                            </button>
                            <button
                                type="button"
                                onClick={() => setMergedPage((p) => Math.min(mergedTotalPages, p + 1))}
                                disabled={mergedPage >= mergedTotalPages}
                                style={{padding: "6px 10px"}}
                            >
                                Next
                            </button>
                            <button
                                type="button"
                                onClick={() => setMergedPage(mergedTotalPages)}
                                disabled={mergedPage >= mergedTotalPages}
                                style={{padding: "6px 10px"}}
                            >
                                Last
                            </button>
                            <span style={{color: "#666"}}>
                                {filteredMergedEntries.length} matched of {allMergedEntries.length} total - page {mergedPage}/{mergedTotalPages}
                            </span>
                        </div>
                    </td>
                </tr>
                {pagedMergedEntries.map(([key, value]) => (
                    <Row key={key} label={key} value={value}/>
                ))}
            </Section>
        </main>
    );
}
