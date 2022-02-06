<template>
  <div>
	  <!-- 회원정보 출력 -->
	  <v-card-text class="text-subtitle-2">
		  <b>{{member.mb_name}}</b>
		  ({{LV_LABEL(member.mb_level)}})
		  </v-card-text>
    <!-- 관리자 메뉴 -->
    <v-list v-if="isAdmin" dense>
      <v-subheader>관리자 메뉴</v-subheader>
      <v-list-item
        v-for="item in admMenus"
        :key="item.title"
        dense
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- // 관리자 메뉴 -->
    <v-card-actions>
      <v-btn color="primary" @click="$emit('open')" block>회원정보수정</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn color="secondary" @click="logout" block>로그아웃</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { LV, LV_LABEL } from "../../../util/level";

export default {
  name: "MemberMenu",
  data() {
    return {
      admMenus: [
        { title: "설정 관리", icon: "mdi-cog", to: "/adm/config" },
        { title: "회원 관리", icon: "mdi-account-cog", to: "/adm/member" },
        { title: "메뉴 관리", icon: "mdi-menu", to: "/adm/menu" },
      ],
    };
  },
  socket() {
    return {
      "member:admUpdate": async (newMember) => {
        // 소켓으로 수정된 회원정보를 받아옴
        if (this.member.mb_level !== newMember.mb_level) {
          if (newMember.mb_level < LV.MEMBER) {
            // 블록되면 로그아웃 처리, 블록 메시지 전송
            const mb_name = await this.signOut();
            this.$toast.error(`${mb_name}님 관리자에 의해 로그아웃되었습니다.`);
            if (this.$route.name != "Home") {
              this.$router.push("/");
            }
          } else {
            // 권한변경 메시지 보냄
			const msg = `${
                newMember.mb_name
              }님, 관리자에 의해 등급이 변경되었습니다.\n기존 레벨: ${LV_LABEL(
                this.member.mb_level
              )}, 변경 레벨: ${LV_LABEL(newMember.mb_level)}`;
            this.$toast.info(msg);
            this.SET_MEMBER(newMember);
          }
        } else {
          const msg = `${newMember.mb_name}님, 관리자에 의해 회원 정보가 수정되었습니다.`;
          this.$toast.info(msg);
          this.SET_MEMBER(newMember);
        }
      },
    };
  },
  computed: {
    ...mapState({
      member: (state) => state.user.member,
    }),
    ...mapGetters("user", ["isAdmin", "isSuper"]),
	LV_LABEL: () => LV_LABEL,
  },
  methods: {
    ...mapMutations("user", ["SET_MEMBER"]),
    ...mapActions("user", ["signOut"]),
    async logout() {
      const mb_name = await this.signOut();
      if (mb_name) {
        this.$toast.info(`${mb_name}님 로그아웃 하였습니다.`);
        if (this.$route.name != "Home") {
          this.$router.push("/");
        }
      }
    },
  },
};
</script>

<style>
</style>