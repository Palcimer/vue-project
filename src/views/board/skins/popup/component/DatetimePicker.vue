<template>
  <div class="d-flex">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          :label="label"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
    </v-menu>
    <v-select
      :items="hourItems"
      v-model="hour"
      suffix="시"
      style="max-width: 80px"
      class="ml-4"
    ></v-select>
    <v-select
      :items="minuteItems"
      v-model="minute"
      suffix="분"
      style="max-width: 80px"
      class="ml-4"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "DatetimePicker",
  model: {
    value: "value",
    event: "input",
  },
  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  data() {
    return {
      menu: false,
      date: "",
      hour: 0,
      minute: 0,
    };
  },
  computed: {
    hourItems() {
      const arr = [];
      for (let i = 0; i < 24; i++) {
        arr.push(i);
      }
      return arr;
    },
    minuteItems() {
      return [0, 15, 30, 45];
    },
  },
  watch: {
      date() {
          this.emitValue();
      },
      hour() {
          this.emitValue();
      },
      minute() {
          this.emitValue();
      },
  },
  created() {
    const date = this.value ? this.$moment(this.value) : this.$moment();
    this.date = date.format("L");
    this.hour = parseInt(date.format("H"));
    this.minute = this.value ? parseInt(date.format("m")) : 0;
  },
  methods: {
      emitValue() {
          if(!this.date) return;
          const date = this.$moment(this.date);
          date.set('hour', this.hour);
          date.set('minute', this.minute);
          this.$emit('input', date.format('LT'));
      }
  }
};
</script>

<style>
</style>