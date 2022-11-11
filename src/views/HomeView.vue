<script>
import IconBubble from "@/components/core/IconBubble.vue";
import NetworkCard from "@/components/core/NetworkCard.vue";
import DevicesCard from "../components/core/DevicesCard.vue";

export default {
  data() {
    return {
      status: {
        state: "",
        message: "",
      },
    };
  },
  methods: {
    getWelcomeMessage() {
      console.log(this.$store.state);
      const insightCard = this.$store.state.insightCards.filter(
        (e) => e.category === "ACCESS_POINTS"
      );
      if (insightCard.length === 1) {
        return insightCard[0].card.title;
      }
      return "";
    },
  },
  mounted() {
    console.log(this.$store);
    this.$store.dispatch("updateData");
  },
  components: {
    IconBubble,
    NetworkCard,
    DevicesCard,
  },
};
</script>

<template>
  <div class="home">
    <p v-if="status.state">{{ `${status.state}: ${status.message}` }}</p>
    <h1 v-text="$store.state.privateSsid" />
    <p>
      {{ getWelcomeMessage() }}
    </p>

    <div class="overviewBubbles">
      <icon-bubble
        :text="`${this.$t('home.internet')}`"
        icon="globe"
        :onClick="() => $router.push('/network')"
      />
      <icon-bubble
        :text="`${this.$t('home.accespoints')} (${
          $store.state.wifiDevices.length
        })`"
        icon="network-wired"
        :onClick="() => $router.push('/points')"
      />
      <icon-bubble
        :text="`${this.$t('devices.title')} (${
          $store.state.devices.filter((d) => d.connected).length
        })`"
        icon="laptop"
        :onClick="() => $router.push('/devices')"
      />
    </div>

    <network-card />
    <devices-card />
  </div>
</template>

<style scoped>
.home {
  margin-top: 4rem;
}

.overviewBubbles {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;

  max-width: 45rem;
  margin: 0 auto;

  padding-bottom: 2rem;
}

p {
  color: #9aa0a6;
  font-weight: bold;
}
</style>
