import messages from "@intlify/vite-plugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";

export default createI18n({
  legacy: false,
  locale: "en-EN",
  globalInjection: true,
  messages,
});
