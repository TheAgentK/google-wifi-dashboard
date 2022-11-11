<template>
  <div class="card">
    <div class="content">
      <h2>{{ $t("network.realtime_usage.title") }}</h2>
      <apexchart
        ref="chart"
        width="95%"
        type="line"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <div class="row current-upload-download">
        <div class="current-upload">
          {{ (realtimeData.transmitSpeedBps / 1000 / 1000).toPrecision(3) }}
          {{ $t("network.realtime_usage.speed_unit") }}
          <div class="subtitle">
            {{ $t("network.realtime_usage.current_upload") }}
          </div>
        </div>
        <div class="current-download">
          {{ (realtimeData.receiveSpeedBps / 1000 / 1000).toPrecision(3) }}
          {{ $t("network.realtime_usage.speed_unit") }}
          <div class="subtitle">
            {{ $t("network.realtime_usage.current_download") }}
          </div>
        </div>
      </div>
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

  display: flex;
  flex-direction: column;
  text-align: left;
}

.content {
  padding-left: 1.5rem;
}

.icon {
  margin-right: 0.75rem;
}

.title {
  display: flex;
  flex-direction: row;

  align-items: left;

  border-bottom: 2px solid #595c61;
  padding-left: 1rem;
  text-align: left;

  cursor: pointer;
}

.row {
  align-items: stretch;
  display: flex;
}
.current-upload-download {
  margin-top: 1rem;
}
.row > div {
  flex: 1 1;
  text-align: center;
}
.current-upload {
  color: #d7adfb;
  position: relative;
}
.current-upload:after {
  position: absolute;
  content: "";
  border-right: 1px solid #969ca2;
  height: 90%;
  right: 0px;
  top: 0px;
}
.current-download {
  color: #a8dab5;
}
.current-upload .subtitle,
.current-download .subtitle {
  color: #969ca2;
}
</style>

<script>
export default {
  data() {
    return {
      intervalUpdate: null,
      chartOptions: {
        colors: ["#D7ADFB", "#A8DAB5"],
        chart: {
          id: "realtime-metrics",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
        },
        xaxis: {
          type: "datetime",
          range: 27000,
        },
        noData: {
          text: "loading...",
          style: {
            color: "#fff",
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          padding: {
            left: 0,
            right: 0,
          },
        },
        markers: {
          size: 0,
          hover: {
            size: 0,
          },
        },
        legend: {
          show: false,
        },
      },
      series: [
        { name: "transmitSpeedBps", data: [] },
        { name: "receiveSpeedBps", data: [] },
      ],
    };
  },
  mounted() {
    this.intervalUpdate = setInterval(async () => {
      this.updateChart();
    }, 1000);
  },
  beforeUnmount() {
    if (this.intervalUpdate) clearInterval(this.intervalUpdate);
  },
  computed: {
    realtimeData() {
      const empty = { transmitSpeedBps: 0, receiveSpeedBps: 0 };
      if (!this.$store.state.realtimeMetrics) return empty;
      if (!this.$store.state.realtimeMetrics.groupTraffic) return empty;
      return this.$store.state.realtimeMetrics.groupTraffic;
    },
  },
  methods: {
    updateChart() {
      const groupTraffic = this.realtimeData;
      const currentTime = new Date().getTime();
      Object.entries(groupTraffic).forEach(([k, v]) => {
        const found = this.series.find((n) => n.name == k);
        if (found) {
          found.data.push([
            currentTime,
            Number((v / 1000 / 1000).toPrecision(3)),
          ]);
        }
      });
      // TODO remove old data (to prevent memory leaking)
    },
  },
};
</script>
