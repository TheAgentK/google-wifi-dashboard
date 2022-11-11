<template>
  <div class="network">
    <navigation to="/" :text="`${this.$t('network.title')}`" />
    <div v-if="$store.state.devices.length == 0">
      <p>{{ $t("devices.loading") }}</p>
    </div>
    <div v-if="$store.state.devices.length != 0">
      <h2>{{ $t("devices.primary") }}</h2>
      <div v-for="device in mainNetworkDevices" :key="device.id">
        <device-row :device="device" />
      </div>
      <div v-for="device in offlineNetworkDevices" :key="device.id">
        <device-row :device="device" />
      </div>
      <h2>{{ $t("devices.guestnetwork") }}</h2>
      <div v-for="device in guestNetworkDevices" :key="device.id">
        <device-row :device="device" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.network {
  margin-top: 4rem;
}
</style>

<script>
import Navigation from "../components/core/NavigationCard.vue";
import DeviceRow from "../components/partials/DeviceRow.vue";

export default {
  components: {
    Navigation,
    DeviceRow,
  },
  computed: {
    mainNetworkDevices() {
      console.log(this.$store.state.devices);
      return this.$store.state.devices
        .filter((e) => e.connected)
        .filter((e) => e.connectionType !== "GUEST_WIRELESS")
        .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));
    },
    guestNetworkDevices() {
      return this.$store.state.devices
        .filter((e) => e.connected)
        .filter((e) => e.connectionType === "GUEST_WIRELESS")
        .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));
    },
    offlineNetworkDevices() {
      return this.$store.state.devices
        .filter((e) => e.connected === undefined)
        .sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));
    },
  },
};
</script>
