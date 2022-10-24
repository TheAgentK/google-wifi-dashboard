<template>
  <div>
    <div v-if="$store.state.isLoggedIn">
      <slot />
    </div>
    <Setup v-else />
  </div>
</template>

<script>
import Setup from "@/components/partials/SetupCard.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Setup,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>
