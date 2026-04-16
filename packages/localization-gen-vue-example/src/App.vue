<script setup lang="ts">
import { useLocalization } from "localization-gen-vue-adapter";

const { locale, setLocale, manifest, namespace } = useLocalization();

const commonNs = namespace("common");
const authNs = namespace("auth");
const homeNs = namespace("home");
</script>

<template>
  <main style="font-family: system-ui, sans-serif; padding: 24px; max-width: 720px; margin: 0 auto">
    <!-- locale switcher -->
    <div style="display: flex; gap: 8px; margin-bottom: 24px; align-items: center">
      <button
        v-for="l in manifest.locales"
        :key="l"
        type="button"
        :style="{ fontWeight: locale === l ? 'bold' : 'normal', padding: '4px 12px', cursor: 'pointer' }"
        @click="setLocale(l)"
      >{{ l.toUpperCase() }}</button>
      <span style="color: #555">Active locale: <strong>{{ locale }}</strong></span>
    </div>

    <!-- (3) Basic strings -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(3) Basic strings</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">strings.app_title</td><td>{{ commonNs.translate("strings.app_title") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">strings.powered_by</td><td>{{ commonNs.translate("strings.powered_by") }}</td></tr>
      </table>
    </section>

    <!-- (4) Nested keys -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(4) Nested keys</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">simple.hello</td><td>{{ commonNs.translate("simple.hello") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">simple.welcome.title</td><td>{{ commonNs.translate("simple.welcome.title") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">simple.settings.profile.title</td><td>{{ commonNs.translate("simple.settings.profile.title") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">simple.settings.security.password.change.title</td><td>{{ commonNs.translate("simple.settings.security.password.change.title") }}</td></tr>
      </table>
    </section>

    <!-- (5–8) Placeholders -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(5–8) Placeholders + metadata + multiple params + reordering</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">placeholders.welcome_user</td><td>{{ commonNs.format("placeholders.welcome_user", { name: "Alfin" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">placeholders.attempts_left</td><td>{{ commonNs.format("placeholders.attempts_left", { attempts: 3 }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">placeholders.invalid_character</td><td>{{ commonNs.format("placeholders.invalid_character", { char: "#" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">placeholders.remaining_time</td><td>{{ commonNs.format("placeholders.remaining_time", { remaining_time: "02:15" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">placeholders.full_name</td><td>{{ commonNs.format("placeholders.full_name", { first_name: "Ada", last_name: "Lovelace" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">placeholders.items_in_city</td><td>{{ commonNs.format("placeholders.items_in_city", { count: 12, city: "Jakarta" }) }}</td></tr>
      </table>
    </section>

    <!-- (9–11) Formatting -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(9) Newline  (10) Quote  (11) Unicode</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">formatting.multiline</td><td style="white-space: pre">{{ commonNs.translate("formatting.multiline") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">formatting.quotes</td><td>{{ commonNs.translate("formatting.quotes") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">formatting.unicode</td><td>{{ commonNs.translate("formatting.unicode") }}</td></tr>
      </table>
    </section>

    <!-- (12) Symbols -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(12) Symbols</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr v-for="k in ['version_tag','email_like','hash_like','path_like','masked_pin','masked_otp','copyright_notice','registered_mark','trademark_notice','currency_and_amount','percent_like','math_like','degree_like','arrow_like','pipe_like','bullet_list_like','url_query_like']" :key="k">
          <td style="color: #888; padding-right: 16px; white-space: nowrap">symbols.{{ k }}</td>
          <td>{{ commonNs.translate(`symbols.${k}`) }}</td>
        </tr>
      </table>
    </section>

    <!-- (13–14) Literals -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(13–14) Literals</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">literals.double_curly</td><td>{{ commonNs.translate("literals.double_curly") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">literals.square_brackets</td><td>{{ commonNs.translate("literals.square_brackets") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">literals.literal_braces</td><td>{{ commonNs.translate("literals.literal_braces") }}</td></tr>
      </table>
    </section>

    <!-- (15) Structured -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(15) Structured forms</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@plural items(0)</td><td>{{ commonNs.plural("structured.items", 0) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@plural items(1)</td><td>{{ commonNs.plural("structured.items", 1) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@plural items(5)</td><td>{{ commonNs.plural("structured.items", 5) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@gender user_title(male)</td><td>{{ commonNs.gender("structured.user_title", "male", { last_name: "Smith" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@gender user_title(female)</td><td>{{ commonNs.gender("structured.user_title", "female", { last_name: "Smith" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context greeting(formal)</td><td>{{ commonNs.context("structured.greeting", "formal", { name: "Alfin" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context greeting(casual)</td><td>{{ commonNs.context("structured.greeting", "casual", { name: "Alfin" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context invalidCode(register)</td><td>{{ commonNs.context("structured.invalid_code_errors", "register") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context invalidCode(verification)</td><td>{{ commonNs.context("structured.invalid_code_errors", "verification") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context action_label(primary)</td><td>{{ commonNs.context("structured.action_label", "primary") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context action_label(secondary)</td><td>{{ commonNs.context("structured.action_label", "secondary") }}</td></tr>
      </table>
    </section>

    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(16) Namespace API parity check</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">auth.strings.login_title</td><td>{{ authNs.translate("strings.login_title") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">home.strings.headline</td><td>{{ homeNs.translate("strings.headline") }}</td></tr>
      </table>
    </section>
  </main>
</template>

