<template>
  <div>
    <board-latest table="tt" skin="basic" :limit="4"/>
    <!-- <board-latest table="testt" skin="gallery" :limit="4"/> -->
    <board-latest table="testt" skin="slider" :limit="5"/>
  </div>  
</template>
<script>
import { mapState } from 'vuex';
import BoardLatest from '../components/Latest/BoardLatest.vue';
export default {
  components: { BoardLatest },
  name: "Home",
	title() {
		return this.title
	},
	data() {
		return {
			title : "My Home",
      toId: '',
      userMsg: '',
		}
	},
  computed: {
    ...mapState({
      title: state => state.config?.title ?? "타이틀을 설정하세요.",
    })
  },
  methods: {
  },
};
</script>
