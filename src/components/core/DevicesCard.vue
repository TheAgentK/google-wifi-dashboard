<template>
  <div class="card">
    <div class="title" @click="$router.push('/devices')">
      <font-awesome-icon icon="laptop" class="icon" />
      <p>{{ $t("devices.title").toUpperCase() }}</p>
    </div>
    <div class="content">
      <div v-if="$store.state.devices.length == 0">
        <p>{{ $t("devices.loading") }}</p>
      </div>
      <div
        v-for="device in mainNetworkDevices.slice(0, 3)"
        :key="device.id"
        v-else
      >
        <device-row :device="device" />
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
}

.icon {
  margin-right: 0.75rem;
}

.title {
  display: flex;
  flex-direction: row;

  align-items: center;

  border-bottom: 2px solid #595c61;
  padding-left: 1rem;
  margin-bottom: 1rem;
  text-align: left;

  cursor: pointer;
}

.content {
  padding-left: 1rem;
}
</style>

<script>
import DeviceRow from "../partials/DeviceRow.vue";

export default {
  components: {
    DeviceRow,
  },
  computed: {
    sortedDevices() {
      const devices = this.$store.state.devices;
      return devices
        .sort((a, b) => !!b.connected - !!a.connected)
        .filter((e) => e.friendlyName !== "Unnamed device");
    },
    mainNetworkDevices() {
      return this.$store.state.devices.filter(
        (e) => e.connectionType !== "GUEST_WIRELESS" && e.connected
      );
    },
    guestNetworkDevices() {
      return this.$store.state.devices.filter(
        (e) => e.connectionType === "GUEST_WIRELESS" && e.connected
      );
    },
  },
};
</script>
