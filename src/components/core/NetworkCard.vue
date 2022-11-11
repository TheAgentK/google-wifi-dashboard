<template>
  <div class="card">
    <div class="title" @click="$router.push('/network')">
      <font-awesome-icon icon="wifi" class="icon" />
      <p>{{ $t("network.title").toUpperCase() }}</p>
    </div>
    <div class="content">
      <div class="row">
        <speed-test-result
          backgroundColor="#35483e"
          :speed="
            (
              $store.state.speedTestResults.receiveWanSpeedBps /
              1000 /
              1000
            ).toPrecision(3)
          "
          :subtext="`${this.$t('network.download_speed')}`"
        />
        <speed-test-result
          backgroundColor="#493955"
          :speed="
            (
              $store.state.speedTestResults.transmitWanSpeedBps /
              1000 /
              1000
            ).toPrecision(3)
          "
          :subtext="`${this.$t('network.upload_speed')}`"
        />
      </div>
      <div class="row">
        <div v-for="card in $store.state.insightCards" :key="card.id">
          <div v-if="card.category === 'INTERNET_USAGE'">
            <insight-card :card="card" class="no-border text-center" />
          </div>
        </div>
      </div>
      <!-- <p>
        {{ $t("network.latest_speedtest") }}
        {{ new Date($store.state.speedTestResults.timestamp).toDateString() }}
      </p> -->
      <p class="action" @click="runSpeedTest()">
        {{ $t("network.run_speedtest") }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 2px solid #595c61;
  border-radius: 0.5rem;
  margin: 0 auto;
  max-width: 40rem;
  margin-bottom: 2rem;
}

.icon {
  margin-right: 0.75rem;
}

p.action {
  color: #84b2ef;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0px;
}

.title {
  display: flex;
  flex-direction: row;

  align-items: center;

  border-bottom: 2px solid #595c61;
  padding-left: 1rem;
  text-align: left;

  cursor: pointer;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.no-border {
  border: 0px;
  margin-bottom: 0px;
}
.text-center {
  text-align: center;
}

.card .card {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>

<script>
import InsightCard from "@/components/core/InsightCard.vue";
import SpeedTestResult from "@/components/partials/SpeedTestResult.vue";
import { getGoogleWifiApi } from "@/lib/googleWifiApi";

export default {
  components: {
    SpeedTestResult,
    InsightCard,
  },
  methods: {
    async runSpeedTest() {
      const apId = this.$store.state.realtimeMetrics.meshMetrics[0].apId;

      if (apId) {
        const res = await getGoogleWifiApi().requestAccessPointLocalSpeedTest(
          apId
        );
        console.log(res);
      }
    },
  },
};
</script>
