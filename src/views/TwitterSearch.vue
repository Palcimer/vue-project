<template>
  <div>
    <v-btn v-bind="auth">로그인</v-btn>
    <v-btn @click="getBookmark">북마크 불러오기</v-btn>
    <v-btn @click="print">콘솔</v-btn>
    <v-btn @click="test">콘솔</v-btn>
    트위터 검색
    <v-form>
      <v-text-field label="검색어" v-model="keyword" />
      <v-checkbox label="정확히 일치" v-model="searchExact" />
      <v-text-field label="제외할 검색어" v-model="exclusion" />
      <v-text-field label="트윗한 아이디" v-model="fromId" />
      <v-checkbox label="리트윗 포함" v-model="includingRetweets" />
      <v-text-field label="최소 리트윗 수" v-model="minRetweets" />
      <v-text-field label="최소 마음 수" v-model="minFaves" />
      <v-checkbox label="링크 포함" v-model="includingLink" />
      <v-checkbox label="이미지 포함" v-model="includingImage" />
      <v-checkbox label="동영상 포함" v-model="includingVideos" />
      <v-checkbox label="이름 검색 제외" v-model="excludingName" />
      <v-checkbox label="내가 팔로우하는 사람 중에서만" v-model="followOnly" />
      <v-checkbox label="최신순 정렬" v-model="live" />
      

      <div class="text-center">
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
              v-model="since"
            label="검색 시작일"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="since" @input="menu = false"></v-date-picker>
        </v-menu>
      </div>
      <div class="text-center">
        <v-menu offset-y :close-on-content-click="false" v-model="menu">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="until"
              label="검색 종료일"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="until" @input="menu = false"></v-date-picker>
        </v-menu>
      </div>
    </v-form>
    <v-btn v-bind="link"> </v-btn>
  </div>
</template>

<script>
import { TwitterApi } from 'twitter-api-v2';
import { mapMutations } from 'vuex';
export default {
  name: "TwitterSearch",
  data() {
    return {
      menu: false,
      url: "https://twitter.com/search?q=",
      query: "",
      keyword: "",
      exclusion: "",
      searchExact: false,
      fromId: "",
      minRetweets: "",
      minFaves: "",
      minReplies: "",
      includingLink: false,
      includingImage: false,
      includingVideos: false,
      includingRetweets: false,
      excludingName: true,
      excludingId: "",
      since: "",
      until: "",
      language: "",
      followOnly: false,
      live: false,
      all: "",
      state: "",
      codeVerifier: "",
      client: {},
      authlink: '',
    };
  },
  created() {
    this.initTwitterClient();
  },
  computed: {
    link() {
      return {
        href: this.search(),
        target: "_blank",
      };
    },
    auth() {
      return {
        href: this.authlink,
        target: "_blank",
      }; 
    }
  },
  methods: {
    ...mapMutations('twitter', ['SET_CODE_VERIFIER']),
    async initTwitterClient() {
      const { url, codeVerifier, state } = await this.$axios.get('/api/twitter/init');
      console.log(url, codeVerifier);
      this.codeVerifier = codeVerifier;
      this.authlink = url;
    },
    initAuth() {
    },
    print() {
      console.log(this);
    },
    async getBookmark() {
      client.loginWithOAuth2({ code, codeVerifier, redirectUri: CALLBACK_URL })
    .then(async ({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
      // {loggedClient} is an authenticated client in behalf of some user
      // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
      // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)

      // Example request
      const { data: userObject } = await loggedClient.v2.me();
    })
    .catch(() => res.status(403).send('Invalid verifier or access tokens!'));

      console.log(this);
      // const meUser = await this.client.v2.me();
      console.log(meUser);
    },
    test() {
      this.$axios.get('/api/twitter/search');
    },
    search() {
      const url = "https://twitter.com/search?";
      let query = `q=${this.keyword}`;
      if (this.searchExact) {
        query = `q="${this.keyword}"`;
      }
      if (this.exclusion) {
        query += ` -${this.exclusion}`;
      }
      if (this.excludingName) {
        query += ` OR @qwertyuiop1234567890`;
      }
      if (this.fromId) {
        query += ` from:${this.fromId}`;
      }
      if (this.minRetweets) {
        query += ` min_retweets:${this.minRetweets}`;
      }
      if (this.minFaves) {
        query += ` min_faves:${this.minFaves}`;
      }
      if (this.minReplies) {
        query += ` min_replies:${this.minReplies}`;
      }
      if (this.includingLink) {
        query += ` filter:links`;
      }
      if (this.includingImage) {
        query += ` filter:images`;
      }
      if (this.includingVideos) {
        query += ` filter:videos`;
      }
      if (this.includingRetweets) {
        query += ` include:nativeretweets`;
      }
      if (this.since) {
        query += ` since:${this.since}`;
      }
      if (this.until) {
        query += ` until:${this.until}`;
      }
      if (this.language) {
        query += ` lang:${this.language}`;
      }
      if(this.followOnly) {
        query += '&pf=on'
      }
      if(this.live) {
        query += '&f=live'
      }
      console.log("search()========", url + query);
      this.all = url + query;
      return this.all;
    },
  },
};
</script>

<style>
</style>