<template>
  <div class="network">
    <navigation to="/" :text="`${this.$t('network.title')}`" />
    <points-card />
  </div>
</template>

<style scoped>
.network {
  margin-top: 4rem;
}
</style>

<script>
import PointsCard from "@/components/core/PointsCard.vue";
import Navigation from "../components/core/NavigationCard.vue";

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
    PointsCard,
    Navigation,
  },
};
</script>
