<template>
    <component :is="cpName"></component>
</template>

<script>
import coverbig from './app/CoverBig';
import coversmall from './app/CoverSmall';
import smokebig from './app/SmokeBig';
import smokesmall from './app/SmokeSmall';
import environmentsmall from './app/EnvironmentSmall';
import environmentbig from './app/EnvironmentBig';
import commonbig from './app/CommonBig';
import doorlocksmall from './app/DoorLockSmall';
import doorlockbig from './app/DoorLockBig';
import dustbinsmall from './app/DustBinSmall';
import dustbinbig from './app/DustBinBig';
import dustsmall from './app/DustSmall';
import dustbig from './app/DustBig';

export default {
  name: 'childComponent',
  components: {
    coverbig,
    coversmall,
    smokebig,
    smokesmall,
    environmentsmall,
    environmentbig,
    commonbig,
    doorlocksmall,
    doorlockbig,
    dustbinsmall,
    dustbinbig,
    dustsmall,
    dustbig,
  },
  props: {
    childName: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  computed: {
    cpName() {
      return `${this.childName}${this.size}`;
    },
  },
};
</script>
