<template>
  <div class="network">
    <navigation to="/" :text="`${this.$t('network.title')}`" />
    <network-card />
    <realtime-usage />
  </div>
</template>

<style scoped>
.network {
  margin-top: 4rem;
}
</style>

<script>
import NetworkCard from "@/components/core/NetworkCard.vue";
import Navigation from "../components/core/NavigationCard.vue";
import RealtimeUsage from "../components/core/RealtimeUsage.vue";

export default {
  data() {
    return {
      status: {
        state: "",
        message: "",
      },
    };
  },
  components: {
    NetworkCard,
    Navigation,
    RealtimeUsage,
  },
};
</script>
De, RealtimeUsagevicesCard
