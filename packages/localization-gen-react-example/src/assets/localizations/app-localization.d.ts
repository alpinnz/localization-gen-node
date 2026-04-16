import type { AppLocalizationManifest } from "./app-localization.types";
declare const manifest: AppLocalizationManifest;
/**
 * Type-safe accessor tree — property names preserve source key segments.
 * Leaf values are full message keys for use with store.t().
 */
export declare const appLocalization: {
    readonly banner: {
        readonly common: {
            readonly cta: "auth.banner.common.cta";
            readonly title: "auth.banner.common.title";
        };
        readonly email_first: {
            readonly message: "auth.banner.email_first.message";
        };
        readonly wa_first: {
            readonly message: "auth.banner.wa_first.message";
        };
    };
    readonly btn_verifikasi_email: "auth.btn_verifikasi_email";
    readonly change_email: {
        readonly cta: {
            readonly cancel: "auth.change_email.cta.cancel";
            readonly submit: "auth.change_email.cta.submit";
        };
        readonly error: {
            readonly email_already_used: "auth.change_email.error.email_already_used";
            readonly email_invalid_format: "auth.change_email.error.email_invalid_format";
            readonly email_required: "auth.change_email.error.email_required";
            readonly email_same_as_previous: "auth.change_email.error.email_same_as_previous";
        };
        readonly field: {
            readonly email: {
                readonly label: "auth.change_email.field.email.label";
                readonly placeholder: "auth.change_email.field.email.placeholder";
            };
        };
        readonly modal: {
            readonly subtitle: "auth.change_email.modal.subtitle";
            readonly title: "auth.change_email.modal.title";
        };
    };
    readonly change_wa: {
        readonly cta: {
            readonly cancel: "auth.change_wa.cta.cancel";
            readonly submit: "auth.change_wa.cta.submit";
        };
        readonly error: {
            readonly already_used: "auth.change_wa.error.already_used";
            readonly invalid_format: "auth.change_wa.error.invalid_format";
            readonly required: "auth.change_wa.error.required";
            readonly same_as_old: "auth.change_wa.error.same_as_old";
        };
        readonly field: {
            readonly phone: {
                readonly label: "auth.change_wa.field.phone.label";
                readonly placeholder: "auth.change_wa.field.phone.placeholder";
            };
        };
        readonly modal: {
            readonly subtitle: "auth.change_wa.modal.subtitle";
            readonly title: "auth.change_wa.modal.title";
        };
        readonly toast: {
            readonly success: {
                readonly message: "auth.change_wa.toast.success.message";
            };
        };
    };
    readonly check_email: {
        readonly description: "auth.check_email.description";
        readonly description_1: "auth.check_email.description_1";
        readonly description_2: "auth.check_email.description_2";
        readonly description_3: "auth.check_email.description_3";
        readonly help: {
            readonly check_spam: "auth.check_email.help.check_spam";
            readonly didnt_get_email: "auth.check_email.help.didnt_get_email";
            readonly didnt_get_email_few_minutes: "auth.check_email.help.didnt_get_email_few_minutes";
        };
        readonly page_title: "auth.check_email.page_title";
    };
    readonly confirm_logingoogle: {
        readonly error: {
            readonly name: {
                readonly invalid_char: "auth.confirm_logingoogle.error.name.invalid_char";
                readonly required: "auth.confirm_logingoogle.error.name.required";
            };
            readonly wa: {
                readonly duplicate: "auth.confirm_logingoogle.error.wa.duplicate";
                readonly format: "auth.confirm_logingoogle.error.wa.format";
                readonly required: "auth.confirm_logingoogle.error.wa.required";
            };
        };
        readonly form: {
            readonly email: {
                readonly label: "auth.confirm_logingoogle.form.email.label";
            };
            readonly name: {
                readonly label: "auth.confirm_logingoogle.form.name.label";
                readonly placeholder: "auth.confirm_logingoogle.form.name.placeholder";
            };
            readonly wa: {
                readonly label: "auth.confirm_logingoogle.form.wa.label";
                readonly placeholder: "auth.confirm_logingoogle.form.wa.placeholder";
            };
        };
    };
    readonly consent: {
        readonly privacy_policy: "auth.consent.privacy_policy";
        readonly terms_conditions: "auth.consent.terms_conditions";
    };
    readonly email: {
        readonly verify: {
            readonly body: {
                readonly intro: "auth.email.verify.body.intro";
            };
            readonly cta: {
                readonly button: "auth.email.verify.cta.button";
            };
            readonly footer: {
                readonly disclaimer: "auth.email.verify.footer.disclaimer";
            };
            readonly heading: "auth.email.verify.heading";
            readonly invalid_old_link: {
                readonly message: "auth.email.verify.invalid_old_link.message";
                readonly title: "auth.email.verify.invalid_old_link.title";
            };
            readonly preheader: "auth.email.verify.preheader";
            readonly subject: "auth.email.verify.subject";
            readonly success: {
                readonly cta: {
                    readonly home: "auth.email.verify.success.cta.home";
                };
                readonly message: "auth.email.verify.success.message";
                readonly title: "auth.email.verify.success.title";
            };
        };
    };
    readonly errors: {
        readonly invalid_email: "auth.errors.invalid_email";
        readonly user_not_found: "auth.errors.user_not_found";
        readonly weak_password: "auth.errors.weak_password";
    };
    readonly expired: {
        readonly cta: {
            readonly button: "auth.expired.cta.button";
        };
        readonly message: {
            readonly info: "auth.expired.message.info";
        };
        readonly page_title: "auth.expired.page_title";
        readonly toast: {
            readonly button: "auth.expired.toast.button";
            readonly message: "auth.expired.toast.message";
            readonly success: "auth.expired.toast.success";
            readonly title: "auth.expired.toast.title";
        };
    };
    readonly google_account_preview_privacy_link: "auth.google_account_preview_privacy_link";
    readonly google_account_preview_terms_link: "auth.google_account_preview_terms_link";
    readonly google_account_preview: {
        readonly privacy_link: "auth.google_account_preview.privacy_link";
        readonly terms_link: "auth.google_account_preview.terms_link";
    };
    readonly hardblock: {
        readonly modal: {
            readonly cta: {
                readonly confirm: "auth.hardblock.modal.cta.confirm";
            };
            readonly description: "auth.hardblock.modal.description";
            readonly title: "auth.hardblock.modal.title";
        };
    };
    readonly login_by_google_account: {
        readonly error: {
            readonly email: {
                readonly autofill_failed: "auth.login_by_google_account.error.email.autofill_failed";
            };
            readonly nama: {
                readonly invalid_char: "auth.login_by_google_account.error.nama.invalid_char";
                readonly max: "auth.login_by_google_account.error.nama.max";
                readonly required: "auth.login_by_google_account.error.nama.required";
            };
            readonly tnc: {
                readonly link_failed: "auth.login_by_google_account.error.tnc.link_failed";
                readonly required: "auth.login_by_google_account.error.tnc.required";
            };
            readonly wa: {
                readonly duplicate: "auth.login_by_google_account.error.wa.duplicate";
                readonly format: "auth.login_by_google_account.error.wa.format";
                readonly nondigit: "auth.login_by_google_account.error.wa.nondigit";
                readonly required: "auth.login_by_google_account.error.wa.required";
            };
        };
        readonly form: {
            readonly email: {
                readonly label: "auth.login_by_google_account.form.email.label";
                readonly placeholder: "auth.login_by_google_account.form.email.placeholder";
            };
            readonly nama: {
                readonly label: "auth.login_by_google_account.form.nama.label";
                readonly placeholder: "auth.login_by_google_account.form.nama.placeholder";
            };
            readonly submit: {
                readonly button: "auth.login_by_google_account.form.submit.button";
            };
            readonly tnc: {
                readonly checkbox: "auth.login_by_google_account.form.tnc.checkbox";
                readonly link: "auth.login_by_google_account.form.tnc.link";
            };
            readonly wa: {
                readonly label: "auth.login_by_google_account.form.wa.label";
                readonly placeholder: "auth.login_by_google_account.form.wa.placeholder";
            };
        };
        readonly page_title: "auth.login_by_google_account.page_title";
    };
    readonly login_by_google: {
        readonly banner: {
            readonly whatsapp_required: {
                readonly message: "auth.login_by_google.banner.whatsapp_required.message";
            };
        };
    };
    readonly login_google: {
        readonly auth: {
            readonly oauth_failed: {
                readonly error: {
                    readonly btnclose: "auth.login_google.auth.oauth_failed.error.btnclose";
                    readonly message: "auth.login_google.auth.oauth_failed.error.message";
                    readonly title: "auth.login_google.auth.oauth_failed.error.title";
                };
            };
        };
        readonly idconfirm: {
            readonly cta_cancel: "auth.login_google.idconfirm.cta_cancel";
            readonly cta_confirm: "auth.login_google.idconfirm.cta_confirm";
            readonly description: "auth.login_google.idconfirm.description";
            readonly info_otp: "auth.login_google.idconfirm.info_otp";
            readonly title: "auth.login_google.idconfirm.title";
        };
        readonly register_from_google: {
            readonly toast: {
                readonly success: {
                    readonly message: "auth.login_google.register_from_google.toast.success.message";
                    readonly title: "auth.login_google.register_from_google.toast.success.title";
                };
            };
        };
    };
    readonly login: {
        readonly banner: {
            readonly error: {
                readonly lockout: "auth.login.banner.error.lockout";
                readonly mismatch: "auth.login.banner.error.mismatch";
            };
        };
        readonly form: {
            readonly email_not_found: {
                readonly error: "auth.login.form.email_not_found.error";
            };
            readonly email_wa: {
                readonly errors: {
                    readonly empty: "auth.login.form.email_wa.errors.empty";
                    readonly format: "auth.login.form.email_wa.errors.format";
                    readonly not_found: "auth.login.form.email_wa.errors.not_found";
                };
                readonly label: "auth.login.form.email_wa.label";
                readonly placeholder: "auth.login.form.email_wa.placeholder";
            };
            readonly password_incorrect: {
                readonly error: "auth.login.form.password_incorrect.error";
            };
            readonly password: {
                readonly errors: {
                    readonly empty: "auth.login.form.password.errors.empty";
                    readonly mismatch: "auth.login.form.password.errors.mismatch";
                };
                readonly label: "auth.login.form.password.label";
                readonly placeholder: "auth.login.form.password.placeholder";
            };
            readonly remember_me: {
                readonly label: "auth.login.form.remember_me.label";
            };
            readonly submit: {
                readonly button: "auth.login.form.submit.button";
                readonly disabled: "auth.login.form.submit.disabled";
            };
        };
        readonly google_button: {
            readonly label: "auth.login.google_button.label";
        };
        readonly google_popup: {
            readonly loading: "auth.login.google_popup.loading";
        };
        readonly info: {
            readonly cancelled: {
                readonly subtitle: "auth.login.info.cancelled.subtitle";
                readonly title: "auth.login.info.cancelled.title";
            };
        };
        readonly or: "auth.login.or";
        readonly page_title: "auth.login.page_title";
        readonly register_prompt: {
            readonly link: "auth.login.register_prompt.link";
            readonly text: "auth.login.register_prompt.text";
        };
        readonly session: {
            readonly active_notice: {
                readonly banner: "auth.login.session.active_notice.banner";
            };
            readonly dialog: {
                readonly button: "auth.login.session.dialog.button";
                readonly manual_logout: {
                    readonly description: "auth.login.session.dialog.manual_logout.description";
                };
                readonly session_expired: {
                    readonly message_30d: "auth.login.session.dialog.session_expired.message_30d";
                    readonly message_72h: "auth.login.session.dialog.session_expired.message_72h";
                    readonly title: "auth.login.session.dialog.session_expired.title";
                };
                readonly title: "auth.login.session.dialog.title";
            };
            readonly expired_notice: {
                readonly banner: "auth.login.session.expired_notice.banner";
            };
            readonly toast: {
                readonly resumed: "auth.login.session.toast.resumed";
                readonly title: "auth.login.session.toast.title";
            };
        };
        readonly toast: {
            readonly error: {
                readonly global: {
                    readonly submit: "auth.login.toast.error.global.submit";
                    readonly title: "auth.login.toast.error.global.title";
                };
            };
            readonly success: {
                readonly message: "auth.login.toast.success.message";
                readonly title: "auth.login.toast.success.title";
            };
        };
        readonly welcome: "auth.login.welcome";
    };
    readonly logout: {
        readonly login_google: {
            readonly session_pre_warning: {
                readonly cta: {
                    readonly google: "auth.logout.login_google.session_pre_warning.cta.google";
                };
                readonly modal: {
                    readonly description: "auth.logout.login_google.session_pre_warning.modal.description";
                    readonly title: "auth.logout.login_google.session_pre_warning.modal.title";
                };
                readonly toast: {
                    readonly cancelled: {
                        readonly message: "auth.logout.login_google.session_pre_warning.toast.cancelled.message";
                        readonly title: "auth.logout.login_google.session_pre_warning.toast.cancelled.title";
                    };
                    readonly success_session_renewed: {
                        readonly message: "auth.logout.login_google.session_pre_warning.toast.success_session_renewed.message";
                        readonly title: "auth.logout.login_google.session_pre_warning.toast.success_session_renewed.title";
                    };
                };
            };
        };
        readonly login_manual: {
            readonly session_pre_warning_30d: {
                readonly cta: {
                    readonly submit: "auth.logout.login_manual.session_pre_warning_30d.cta.submit";
                };
                readonly form: {
                    readonly password: {
                        readonly label: "auth.logout.login_manual.session_pre_warning_30d.form.password.label";
                        readonly placeholder: "auth.logout.login_manual.session_pre_warning_30d.form.password.placeholder";
                    };
                };
                readonly info_hint: {
                    readonly message: "auth.logout.login_manual.session_pre_warning_30d.info_hint.message";
                    readonly title: "auth.logout.login_manual.session_pre_warning_30d.info_hint.title";
                };
                readonly modal: {
                    readonly description: "auth.logout.login_manual.session_pre_warning_30d.modal.description";
                    readonly title: "auth.logout.login_manual.session_pre_warning_30d.modal.title";
                };
            };
            readonly session_pre_warning_72h: {
                readonly cta: {
                    readonly submit: "auth.logout.login_manual.session_pre_warning_72h.cta.submit";
                };
                readonly form: {
                    readonly password: {
                        readonly label: "auth.logout.login_manual.session_pre_warning_72h.form.password.label";
                        readonly placeholder: "auth.logout.login_manual.session_pre_warning_72h.form.password.placeholder";
                    };
                };
                readonly info_hint: {
                    readonly message: "auth.logout.login_manual.session_pre_warning_72h.info_hint.message";
                    readonly title: "auth.logout.login_manual.session_pre_warning_72h.info_hint.title";
                };
                readonly modal: {
                    readonly description: "auth.logout.login_manual.session_pre_warning_72h.modal.description";
                    readonly title: "auth.logout.login_manual.session_pre_warning_72h.modal.title";
                };
            };
            readonly session_pre_warning: {
                readonly form: {
                    readonly password: {
                        readonly error: {
                            readonly empty: "auth.logout.login_manual.session_pre_warning.form.password.error.empty";
                            readonly wrong_attempt1: "auth.logout.login_manual.session_pre_warning.form.password.error.wrong_attempt1";
                            readonly wrong_attempt2: "auth.logout.login_manual.session_pre_warning.form.password.error.wrong_attempt2";
                        };
                    };
                };
                readonly toast: {
                    readonly error_wrong_password_attempt3: {
                        readonly message: "auth.logout.login_manual.session_pre_warning.toast.error_wrong_password_attempt3.message";
                        readonly title: "auth.logout.login_manual.session_pre_warning.toast.error_wrong_password_attempt3.title";
                    };
                    readonly success_session_renewed: {
                        readonly message: "auth.logout.login_manual.session_pre_warning.toast.success_session_renewed.message";
                        readonly title: "auth.logout.login_manual.session_pre_warning.toast.success_session_renewed.title";
                    };
                };
            };
        };
    };
    readonly otp_whatsapp: {
        readonly message: "auth.otp_whatsapp.message";
    };
    readonly otp: {
        readonly error_locked: {
            readonly banner: {
                readonly message: "auth.otp.error_locked.banner.message";
                readonly title: "auth.otp.error_locked.banner.title";
            };
        };
        readonly error: {
            readonly expired: "auth.otp.error.expired";
            readonly invalid: "auth.otp.error.invalid";
            readonly invalid_with_resend: "auth.otp.error.invalid_with_resend";
            readonly lock: "auth.otp.error.lock";
        };
        readonly fallback: {
            readonly change_meethod_wa: "auth.otp.fallback.change_meethod_wa";
            readonly change_method: "auth.otp.fallback.change_method";
            readonly sent_email: "auth.otp.fallback.sent_email";
        };
        readonly form: {
            readonly instruction: "auth.otp.form.instruction";
            readonly label: "auth.otp.form.label";
            readonly placeholder: "auth.otp.form.placeholder";
            readonly resend: {
                readonly button: "auth.otp.form.resend.button";
                readonly second: "auth.otp.form.resend.second";
            };
        };
        readonly page_title: "auth.otp.page_title";
        readonly success: {
            readonly toast: {
                readonly message: "auth.otp.success.toast.message";
            };
        };
    };
    readonly placeholders: {
        readonly otp_sent: "auth.placeholders.otp_sent";
        readonly welcome_back: "auth.placeholders.welcome_back";
        readonly greeting_time: "home.placeholders.greeting_time";
        readonly stats_summary: "home.placeholders.stats_summary";
        readonly auto_lock_minutes: "settings.placeholders.auto_lock_minutes";
        readonly region_value: "settings.placeholders.region_value";
    };
    readonly register: {
        readonly error: {
            readonly email: {
                readonly duplicate: "auth.register.error.email.duplicate";
                readonly format: "auth.register.error.email.format";
                readonly required: "auth.register.error.email.required";
            };
            readonly global: {
                readonly submit: "auth.register.error.global.submit";
                readonly title: "auth.register.error.global.title";
            };
            readonly name: {
                readonly invalid_char: "auth.register.error.name.invalid_char";
                readonly required: "auth.register.error.name.required";
            };
            readonly password: {
                readonly common: "auth.register.error.password.common";
                readonly confirm_required: "auth.register.error.password.confirm_required";
                readonly guide: "auth.register.error.password.guide";
                readonly medium: "auth.register.error.password.medium";
                readonly mismatch: "auth.register.error.password.mismatch";
                readonly required: "auth.register.error.password.required";
                readonly strong: "auth.register.error.password.strong";
                readonly too_short: "auth.register.error.password.too_short";
                readonly weak: "auth.register.error.password.weak";
            };
            readonly terms: {
                readonly required: "auth.register.error.terms.required";
            };
            readonly wa: {
                readonly duplicate: "auth.register.error.wa.duplicate";
                readonly format: "auth.register.error.wa.format";
                readonly required: "auth.register.error.wa.required";
            };
        };
        readonly form: {
            readonly checkbox: {
                readonly and: "auth.register.form.checkbox.and";
                readonly privacy_policy: "auth.register.form.checkbox.privacy_policy";
                readonly terms: "auth.register.form.checkbox.terms";
                readonly terms_and_conditions: "auth.register.form.checkbox.terms_and_conditions";
            };
            readonly email: {
                readonly label: "auth.register.form.email.label";
                readonly placeholder: "auth.register.form.email.placeholder";
            };
            readonly name: {
                readonly label: "auth.register.form.name.label";
                readonly placeholder: "auth.register.form.name.placeholder";
            };
            readonly password: {
                readonly confirm: {
                    readonly label: "auth.register.form.password.confirm.label";
                };
                readonly label: "auth.register.form.password.label";
                readonly placeholder: "auth.register.form.password.placeholder";
            };
            readonly submit: {
                readonly button: "auth.register.form.submit.button";
            };
            readonly wa: {
                readonly label: "auth.register.form.wa.label";
                readonly placeholder: "auth.register.form.wa.placeholder";
            };
        };
        readonly page_title: "auth.register.page_title";
    };
    readonly resend_email: {
        readonly change_email: {
            readonly cta: "auth.resend_email.change_email.cta";
        };
        readonly resend: {
            readonly button: {
                readonly disabled: "auth.resend_email.resend.button.disabled";
                readonly enabled: "auth.resend_email.resend.button.enabled";
            };
            readonly limit: {
                readonly message: "auth.resend_email.resend.limit.message";
                readonly title: "auth.resend_email.resend.limit.title";
            };
            readonly success: {
                readonly toast_message: "auth.resend_email.resend.success.toast_message";
            };
        };
    };
    readonly session_refresh: {
        readonly body: {
            readonly description: "auth.session_refresh.body.description";
        };
        readonly cta: {
            readonly google: "auth.session_refresh.cta.google";
            readonly submit: "auth.session_refresh.cta.submit";
        };
        readonly form: {
            readonly password: {
                readonly label: "auth.session_refresh.form.password.label";
            };
        };
        readonly info: {
            readonly description30d: "auth.session_refresh.info.description30d";
            readonly description72h: "auth.session_refresh.info.description72h";
            readonly title: "auth.session_refresh.info.title";
            readonly verif_2nd_identity: "auth.session_refresh.info.verif_2nd_identity";
        };
        readonly page_title: "auth.session_refresh.page_title";
    };
    readonly strings: {
        readonly forgot_password: "auth.strings.forgot_password";
        readonly login_title: "auth.strings.login_title";
        readonly headline: "home.strings.headline";
        readonly home_title: "home.strings.home_title";
        readonly privacy_title: "settings.strings.privacy_title";
        readonly settings_title: "settings.strings.settings_title";
    };
    readonly structured: {
        readonly account_title: "auth.structured.account_title";
        readonly channel_label: "auth.structured.channel_label";
        readonly lock_message: "auth.structured.lock_message";
        readonly banner: "home.structured.banner";
        readonly host_title: "home.structured.host_title";
        readonly notifications: "home.structured.notifications";
        readonly backup_status: "settings.structured.backup_status";
        readonly devices: "settings.structured.devices";
        readonly owner_label: "settings.structured.owner_label";
    };
    readonly two_factor_authentication: {
        readonly email: {
            readonly verify: {
                readonly invalid_old_email: {
                    readonly message: "auth.two_factor_authentication.email.verify.invalid_old_email.message";
                    readonly title: "auth.two_factor_authentication.email.verify.invalid_old_email.title";
                };
                readonly invalid_old_link: {
                    readonly message_1: "auth.two_factor_authentication.email.verify.invalid_old_link.message_1";
                    readonly message_2: "auth.two_factor_authentication.email.verify.invalid_old_link.message_2";
                    readonly message_highlight: "auth.two_factor_authentication.email.verify.invalid_old_link.message_highlight";
                    readonly title: "auth.two_factor_authentication.email.verify.invalid_old_link.title";
                };
                readonly success: {
                    readonly cta: {
                        readonly home: "auth.two_factor_authentication.email.verify.success.cta.home";
                    };
                    readonly message: "auth.two_factor_authentication.email.verify.success.message";
                    readonly title: "auth.two_factor_authentication.email.verify.success.title";
                };
            };
        };
    };
    readonly unregistered_google_account_cancel_button: "auth.unregistered_google_account_cancel_button";
    readonly unregistered_google_account_create_account_button: "auth.unregistered_google_account_create_account_button";
    readonly unregistered_google_account_message: "auth.unregistered_google_account_message";
    readonly unregistered_google_account_title: "auth.unregistered_google_account_title";
    readonly unregistered_google_account: {
        readonly cancel_button: "auth.unregistered_google_account.cancel_button";
        readonly create_account_button: "auth.unregistered_google_account.create_account_button";
        readonly error_modal: {
            readonly subtitle: "auth.unregistered_google_account.error_modal.subtitle";
            readonly title: "auth.unregistered_google_account.error_modal.title";
        };
        readonly message: "auth.unregistered_google_account.message";
        readonly page_title: "auth.unregistered_google_account.page_title";
    };
    readonly verification_issue_email: {
        readonly cta_switch_wa: "auth.verification_issue_email.cta_switch_wa";
        readonly lead: "auth.verification_issue_email.lead";
        readonly page_title: "auth.verification_issue_email.page_title";
    };
    readonly verification_issue_wa: {
        readonly cta_switch_email: "auth.verification_issue_wa.cta_switch_email";
        readonly lead: "auth.verification_issue_wa.lead";
        readonly page_title: "auth.verification_issue_wa.page_title";
    };
    readonly verification_limit_email: {
        readonly button: {
            readonly whatsapp: "auth.verification_limit_email.button.whatsapp";
        };
        readonly limit: {
            readonly message: "auth.verification_limit_email.limit.message";
            readonly message_subtitle: "auth.verification_limit_email.limit.message_subtitle";
            readonly message_title: "auth.verification_limit_email.limit.message_title";
        };
    };
    readonly verification_method: {
        readonly button_continue: "auth.verification_method.button_continue";
        readonly option_email: {
            readonly desc: "auth.verification_method.option_email.desc";
            readonly label: "auth.verification_method.option_email.label";
        };
        readonly option_whatsapp: {
            readonly desc: "auth.verification_method.option_whatsapp.desc";
            readonly label: "auth.verification_method.option_whatsapp.label";
        };
        readonly page_title: "auth.verification_method.page_title";
        readonly section_title: "auth.verification_method.section_title";
    };
    readonly verification: {
        readonly resend: {
            readonly button: {
                readonly label: "auth.verification.resend.button.label";
                readonly success_message: "auth.verification.resend.button.success_message";
            };
        };
    };
    readonly verifikasi_wa: {
        readonly change_wa: {
            readonly cta: "auth.verifikasi_wa.change_wa.cta";
        };
        readonly resend: {
            readonly button: {
                readonly disabled: "auth.verifikasi_wa.resend.button.disabled";
                readonly enabled: "auth.verifikasi_wa.resend.button.enabled";
            };
            readonly limit: {
                readonly message: "auth.verifikasi_wa.resend.limit.message";
                readonly title: "auth.verifikasi_wa.resend.limit.title";
            };
            readonly success: {
                readonly toast_message: "auth.verifikasi_wa.resend.success.toast_message";
                readonly toast_title: "auth.verifikasi_wa.resend.success.toast_title";
            };
        };
    };
    readonly verify: {
        readonly error: {
            readonly limit_reached: "auth.verify.error.limit_reached";
            readonly limit_reached_subtitle: "auth.verify.error.limit_reached_subtitle";
            readonly limit_reached_title: "auth.verify.error.limit_reached_title";
            readonly locked: "auth.verify.error.locked";
        };
        readonly success: {
            readonly cta: "auth.verify.success.cta";
            readonly message: "auth.verify.success.message";
            readonly redirect: "auth.verify.success.redirect";
            readonly success_title: "auth.verify.success.success_title";
            readonly title: "auth.verify.success.title";
            readonly toast: {
                readonly message: "auth.verify.success.toast.message";
                readonly title: "auth.verify.success.toast.title";
            };
        };
        readonly toast: {
            readonly resend_success: "auth.verify.toast.resend_success";
        };
    };
    readonly app_powered: "common.app_powered";
    readonly app_title: "common.app_title";
    readonly fb200_b: "fallback.fb200_b";
    readonly fb200_d: "fallback.fb200_d";
    readonly fb200_h: "fallback.fb200_h";
    readonly fb201_b: "fallback.fb201_b";
    readonly fb201_d: "fallback.fb201_d";
    readonly fb201_h: "fallback.fb201_h";
    readonly fb202_b: "fallback.fb202_b";
    readonly fb202_d: "fallback.fb202_d";
    readonly fb202_h: "fallback.fb202_h";
    readonly fb204_b: "fallback.fb204_b";
    readonly fb204_d: "fallback.fb204_d";
    readonly fb204_h: "fallback.fb204_h";
    readonly fb300_b: "fallback.fb300_b";
    readonly fb300_d: "fallback.fb300_d";
    readonly fb300_h: "fallback.fb300_h";
    readonly fb301_b: "fallback.fb301_b";
    readonly fb301_d: "fallback.fb301_d";
    readonly fb301_h: "fallback.fb301_h";
    readonly fb302_b: "fallback.fb302_b";
    readonly fb302_d: "fallback.fb302_d";
    readonly fb302_h: "fallback.fb302_h";
    readonly fb303_b: "fallback.fb303_b";
    readonly fb303_d: "fallback.fb303_d";
    readonly fb303_h: "fallback.fb303_h";
    readonly fb304_b: "fallback.fb304_b";
    readonly fb304_d: "fallback.fb304_d";
    readonly fb304_h: "fallback.fb304_h";
    readonly fb307_b: "fallback.fb307_b";
    readonly fb307_d: "fallback.fb307_d";
    readonly fb307_h: "fallback.fb307_h";
    readonly fb308_b: "fallback.fb308_b";
    readonly fb308_d: "fallback.fb308_d";
    readonly fb308_h: "fallback.fb308_h";
    readonly fb400_b: "fallback.fb400_b";
    readonly fb400_d: "fallback.fb400_d";
    readonly fb400_h: "fallback.fb400_h";
    readonly fb401_b: "fallback.fb401_b";
    readonly fb401_d: "fallback.fb401_d";
    readonly fb401_h: "fallback.fb401_h";
    readonly fb402_b: "fallback.fb402_b";
    readonly fb402_d: "fallback.fb402_d";
    readonly fb402_h: "fallback.fb402_h";
    readonly fb403_b: "fallback.fb403_b";
    readonly fb403_d: "fallback.fb403_d";
    readonly fb403_h: "fallback.fb403_h";
    readonly fb404_b: "fallback.fb404_b";
    readonly fb404_d: "fallback.fb404_d";
    readonly fb404_h: "fallback.fb404_h";
    readonly fb405_b: "fallback.fb405_b";
    readonly fb405_d: "fallback.fb405_d";
    readonly fb405_h: "fallback.fb405_h";
    readonly fb406_b: "fallback.fb406_b";
    readonly fb406_d: "fallback.fb406_d";
    readonly fb406_h: "fallback.fb406_h";
    readonly fb408_b: "fallback.fb408_b";
    readonly fb408_d: "fallback.fb408_d";
    readonly fb408_h: "fallback.fb408_h";
    readonly fb409_b: "fallback.fb409_b";
    readonly fb409_d: "fallback.fb409_d";
    readonly fb409_h: "fallback.fb409_h";
    readonly fb410_b: "fallback.fb410_b";
    readonly fb410_d: "fallback.fb410_d";
    readonly fb410_h: "fallback.fb410_h";
    readonly fb413_b: "fallback.fb413_b";
    readonly fb413_d: "fallback.fb413_d";
    readonly fb413_h: "fallback.fb413_h";
    readonly fb415_b: "fallback.fb415_b";
    readonly fb415_d: "fallback.fb415_d";
    readonly fb415_h: "fallback.fb415_h";
    readonly fb422_b: "fallback.fb422_b";
    readonly fb422_d: "fallback.fb422_d";
    readonly fb422_h: "fallback.fb422_h";
    readonly fb429_b: "fallback.fb429_b";
    readonly fb429_d: "fallback.fb429_d";
    readonly fb429_h: "fallback.fb429_h";
    readonly fb500_b: "fallback.fb500_b";
    readonly fb500_b_secondary: "fallback.fb500_b_secondary";
    readonly fb500_d: "fallback.fb500_d";
    readonly fb500_h: "fallback.fb500_h";
    readonly fb501_b: "fallback.fb501_b";
    readonly fb501_b_secondary: "fallback.fb501_b_secondary";
    readonly fb501_d: "fallback.fb501_d";
    readonly fb501_h: "fallback.fb501_h";
    readonly fb502_b: "fallback.fb502_b";
    readonly fb502_b_secondary: "fallback.fb502_b_secondary";
    readonly fb502_d: "fallback.fb502_d";
    readonly fb502_h: "fallback.fb502_h";
    readonly fb503_b: "fallback.fb503_b";
    readonly fb503_b_secondary: "fallback.fb503_b_secondary";
    readonly fb503_d: "fallback.fb503_d";
    readonly fb503_h: "fallback.fb503_h";
    readonly fb504_b: "fallback.fb504_b";
    readonly fb504_b_secondary: "fallback.fb504_b_secondary";
    readonly fb504_d: "fallback.fb504_d";
    readonly fb504_h: "fallback.fb504_h";
    readonly support_label: "fallback.support_label";
    readonly support_url: "fallback.support_url";
    readonly http_200_message: "http.http_200_message";
    readonly http_200_title: "http.http_200_title";
    readonly http_201_message: "http.http_201_message";
    readonly http_201_title: "http.http_201_title";
    readonly http_202_message: "http.http_202_message";
    readonly http_202_title: "http.http_202_title";
    readonly http_204_message: "http.http_204_message";
    readonly http_204_title: "http.http_204_title";
    readonly http_400_message: "http.http_400_message";
    readonly http_400_title: "http.http_400_title";
    readonly http_401_message: "http.http_401_message";
    readonly http_401_title: "http.http_401_title";
    readonly http_403_message: "http.http_403_message";
    readonly http_403_title: "http.http_403_title";
    readonly http_404_message: "http.http_404_message";
    readonly http_404_title: "http.http_404_title";
    readonly http_405_message: "http.http_405_message";
    readonly http_405_title: "http.http_405_title";
    readonly http_408_message: "http.http_408_message";
    readonly http_408_title: "http.http_408_title";
    readonly http_409_message: "http.http_409_message";
    readonly http_409_title: "http.http_409_title";
    readonly http_410_message: "http.http_410_message";
    readonly http_410_title: "http.http_410_title";
    readonly http_415_message: "http.http_415_message";
    readonly http_415_title: "http.http_415_title";
    readonly http_422_message: "http.http_422_message";
    readonly http_422_title: "http.http_422_title";
    readonly http_429_message: "http.http_429_message";
    readonly http_429_title: "http.http_429_title";
    readonly http_500_message: "http.http_500_message";
    readonly http_500_title: "http.http_500_title";
    readonly http_502_message: "http.http_502_message";
    readonly http_502_title: "http.http_502_title";
    readonly http_503_message: "http.http_503_message";
    readonly http_503_title: "http.http_503_title";
    readonly http_504_message: "http.http_504_message";
    readonly http_504_title: "http.http_504_title";
    readonly preferences: {
        readonly language: "settings.preferences.language";
        readonly notifications: "settings.preferences.notifications";
        readonly theme: "settings.preferences.theme";
        readonly title: "settings.preferences.title";
    };
    readonly profile: {
        readonly change_password: "settings.profile.change_password";
        readonly edit_profile: "settings.profile.edit_profile";
        readonly logout: {
            readonly button: "settings.profile.logout.button";
            readonly popup: {
                readonly cancel: "settings.profile.logout.popup.cancel";
                readonly confirm: "settings.profile.logout.popup.confirm";
                readonly message: "settings.profile.logout.popup.message";
                readonly title: "settings.profile.logout.popup.title";
            };
        };
        readonly title: "settings.profile.title";
    };
    readonly title: "settings.title";
};
export default manifest;
