<template>
  <div class="video-box">
    <video :src="videoSrc" controls></video>
  </div>
</template>
<script>
import videoSrc from '@/assets/video/about.mp4';

export default {
  name: 'uniconnect',
  data() {
    return {
      videoSrc,
    };
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.video-box {
  position: absolute;
  top: 50%;
  left: 38%;
  width: 700px;
  height: 428px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  z-index: 1111111;
  video {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
@import "~scss_about1920";
</style>
