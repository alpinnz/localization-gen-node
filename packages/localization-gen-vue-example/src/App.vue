<script setup lang="ts">
import { useLocalization } from "localization-gen-vue-adapter";

const fallbackByKey = {
  "common.strings.app_title": "App",
  "common.strings.powered_by": "Powered by localization-gen",
  "auth.strings.login_title": "Login",
  "home.strings.headline": "Welcome"
};

const { locale, setLocale, manifest, translate, format, plural, gender, context } = useLocalization({
  fallback: fallbackByKey
});
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
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.strings.app_title</td><td>{{ translate("common.strings.app_title") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.strings.powered_by</td><td>{{ translate("common.strings.powered_by") }}</td></tr>
      </table>
    </section>

    <!-- (4) Nested keys -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(4) Nested keys</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.simple.hello</td><td>{{ translate("common.simple.hello") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.simple.welcome.title</td><td>{{ translate("common.simple.welcome.title") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.simple.settings.profile.title</td><td>{{ translate("common.simple.settings.profile.title") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.simple.settings.security.password.change.title</td><td>{{ translate("common.simple.settings.security.password.change.title") }}</td></tr>
      </table>
    </section>

    <!-- (5–8) Placeholders -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(5–8) Placeholders + metadata + multiple params + reordering</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.placeholders.welcome_user</td><td>{{ format("common.placeholders.welcome_user", { name: "Alfin" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.placeholders.attempts_left</td><td>{{ format("common.placeholders.attempts_left", { attempts: 3 }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.placeholders.invalid_character</td><td>{{ format("common.placeholders.invalid_character", { char: "#" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.placeholders.remaining_time</td><td>{{ format("common.placeholders.remaining_time", { remaining_time: "02:15" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.placeholders.full_name</td><td>{{ format("common.placeholders.full_name", { first_name: "Ada", last_name: "Lovelace" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.placeholders.items_in_city</td><td>{{ format("common.placeholders.items_in_city", { count: 12, city: "Jakarta" }) }}</td></tr>
      </table>
    </section>

    <!-- (9–11) Formatting -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(9) Newline  (10) Quote  (11) Unicode</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.formatting.multiline</td><td style="white-space: pre">{{ translate("common.formatting.multiline") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.formatting.quotes</td><td>{{ translate("common.formatting.quotes") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.formatting.unicode</td><td>{{ translate("common.formatting.unicode") }}</td></tr>
      </table>
    </section>

    <!-- (12) Symbols -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(12) Symbols</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr v-for="k in ['version_tag','email_like','hash_like','path_like','masked_pin','masked_otp','copyright_notice','registered_mark','trademark_notice','currency_and_amount','percent_like','math_like','degree_like','arrow_like','pipe_like','bullet_list_like','url_query_like']" :key="k">
          <td style="color: #888; padding-right: 16px; white-space: nowrap">common.symbols.{{ k }}</td>
          <td>{{ translate(`common.symbols.${k}`) }}</td>
        </tr>
      </table>
    </section>

    <!-- (13–14) Literals -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(13–14) Literals</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.literals.double_curly</td><td>{{ translate("common.literals.double_curly") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.literals.square_brackets</td><td>{{ translate("common.literals.square_brackets") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">common.literals.literal_braces</td><td>{{ translate("common.literals.literal_braces") }}</td></tr>
      </table>
    </section>

    <!-- (15) Structured -->
    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(15) Structured forms</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@plural common.structured.items(0)</td><td>{{ plural("common.structured.items", 0) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@plural common.structured.items(1)</td><td>{{ plural("common.structured.items", 1) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@plural common.structured.items(5)</td><td>{{ plural("common.structured.items", 5) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@gender common.structured.user_title(male)</td><td>{{ gender("common.structured.user_title", "male", { last_name: "Smith" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@gender common.structured.user_title(female)</td><td>{{ gender("common.structured.user_title", "female", { last_name: "Smith" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context common.structured.greeting(formal)</td><td>{{ context("common.structured.greeting", "formal", { name: "Alfin" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context common.structured.greeting(casual)</td><td>{{ context("common.structured.greeting", "casual", { name: "Alfin" }) }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context common.structured.invalid_code_errors(register)</td><td>{{ context("common.structured.invalid_code_errors", "register") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context common.structured.invalid_code_errors(verification)</td><td>{{ context("common.structured.invalid_code_errors", "verification") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context common.structured.action_label(primary)</td><td>{{ context("common.structured.action_label", "primary") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">@context common.structured.action_label(secondary)</td><td>{{ context("common.structured.action_label", "secondary") }}</td></tr>
      </table>
    </section>

    <section style="margin-bottom: 32px">
      <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #555; margin: 0 0 8px">(16) Full key API parity check</h2>
      <table style="border-collapse: collapse; width: 100%">
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">auth.strings.login_title</td><td>{{ translate("auth.strings.login_title") }}</td></tr>
        <tr><td style="color: #888; padding-right: 16px; white-space: nowrap">home.strings.headline</td><td>{{ translate("home.strings.headline") }}</td></tr>
      </table>
    </section>
  </main>
</template>

