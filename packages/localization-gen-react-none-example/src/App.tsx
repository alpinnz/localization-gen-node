import {useLocalization} from "localization-gen-react-adapter";
import * as React from "react";
import {libLocalization} from "./assets/localizations/lib-localization";

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
                <Row label={libLocalization.app_title} value={translate(libLocalization.app_title)}/>
                <Row label={libLocalization.app_powered} value={translate(libLocalization.app_powered)}/>
            </Section>

            <Section title="(2) Auth detailed + merged keys">
                <Row label={libLocalization.strings.login_title}
                     value={translate(libLocalization.strings.login_title)}/>
                <Row label={libLocalization.placeholders.welcome_back}
                     value={format(libLocalization.placeholders.welcome_back, {name: "Alfin"})}/>
                <Row label={libLocalization.placeholders.otp_sent}
                     value={format(libLocalization.placeholders.otp_sent, {
                         phone: "+62-812-0000-1111",
                         expires_in: "01:30"
                     })}/>
                <Row label={`${libLocalization.structured.lock_message}(3)`}
                     value={plural(libLocalization.structured.lock_message, 3)}/>
                <Row label={`${libLocalization.structured.channel_label}(email)`}
                     value={context(libLocalization.structured.channel_label, "email")}/>
                <Row label={`${libLocalization.structured.account_title}(other)`}
                     value={gender(libLocalization.structured.account_title, "other", {last_name: "Doe"})}/>
                <Row label={`${libLocalization.consent.privacy_policy} (preview)`}
                     value={translate(libLocalization.consent.privacy_policy).slice(0, 120) + "..."}/>
                <Row label={`${libLocalization.consent.terms_conditions} (preview)`}
                     value={translate(libLocalization.consent.terms_conditions).slice(0, 120) + "..."}/>
            </Section>

            <Section title="(3) Home detailed keys">
                <Row label={libLocalization.strings.home_title}
                     value={translate(libLocalization.strings.home_title)}/>
                <Row label={libLocalization.strings.headline}
                     value={translate(libLocalization.strings.headline)}/>
                <Row label={libLocalization.placeholders.greeting_time}
                     value={format(libLocalization.placeholders.greeting_time, {
                         time_of_day: "morning",
                         name: "Alfin"
                     })}/>
                <Row label={libLocalization.placeholders.stats_summary}
                     value={format(libLocalization.placeholders.stats_summary, {tasks: 4, points: 120})}/>
                <Row label={`${libLocalization.structured.notifications}(2)`}
                     value={plural(libLocalization.structured.notifications, 2)}/>
                <Row label={`${libLocalization.structured.banner}(retention)`}
                     value={context(libLocalization.structured.banner, "retention")}/>
                <Row label={`${libLocalization.structured.host_title}(female)`}
                     value={gender(libLocalization.structured.host_title, "female", {last_name: "Rahma"})}/>
            </Section>

            <Section title="(4) Settings detailed + legacy keys">
                <Row label={libLocalization.strings.settings_title}
                     value={translate(libLocalization.strings.settings_title)}/>
                <Row label={libLocalization.strings.privacy_title}
                     value={translate(libLocalization.strings.privacy_title)}/>
                <Row label={libLocalization.placeholders.auto_lock_minutes}
                     value={format(libLocalization.placeholders.auto_lock_minutes, {minutes: 10})}/>
                <Row label={libLocalization.placeholders.region_value}
                     value={format(libLocalization.placeholders.region_value, {region: "APAC"})}/>
                <Row label={`${libLocalization.structured.devices}(1)`}
                     value={plural(libLocalization.structured.devices, 1)}/>
                <Row label={`${libLocalization.structured.backup_status}(synced)`}
                     value={context(libLocalization.structured.backup_status, "synced")}/>
                <Row label={`${libLocalization.structured.owner_label}(male)`}
                     value={gender(libLocalization.structured.owner_label, "male", {last_name: "Wijaya"})}/>
                <Row label={`${libLocalization.title} (legacy)`}
                     value={translate(libLocalization.title)}/>
                <Row label={`${libLocalization.preferences.language} (legacy)`}
                     value={translate(libLocalization.preferences.language)}/>
            </Section>

            <Section title="(5) HTTP + Fallback merged keys">
                <Row label={libLocalization.http_404_title}
                     value={translate(libLocalization.http_404_title)}/>
                <Row label={libLocalization.http_404_message}
                     value={translate(libLocalization.http_404_message)}/>
                <Row label={libLocalization.fb500_h} value={translate(libLocalization.fb500_h)}/>
                <Row label={libLocalization.fb500_d} value={translate(libLocalization.fb500_d)}/>
                <Row label={libLocalization.support_label}
                     value={translate(libLocalization.support_label)}/>
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
