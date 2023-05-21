<template>
  <section class="section section-shaped section-lg my-0">
      <div class="shape shape-style-1 bg-gradient-red">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
      </div>
      <div class="container pt-lg-md">
          <div class="row justify-content-center">
              <div class="col-lg-5">
                  <card type="secondary" shadow
                        header-classes="bg-white pb-5"
                        body-classes="px-lg-5 py-lg-5"
                        class="border-0">
                      <template>
                          <div class="text-muted text-center mb-3">
                              {{userInfo.name}} 님 안녕하세요
                          </div>
                      </template>
                      <template>
                          <form role="form">
                            아이디 
                            <base-input alternative
                                        class="mb-3"
                                        ref="id"
                                        type="text"
                                        id="id"
                                        name="id"
                                        v-model="userInfo.id">
                            </base-input>
                            이 름
                            <base-input alternative
                                          class="mb-3"
                                          type="text"
                                          id="name"
                                          name="name"
                                          v-model="userInfo.name"
                                          >
                              </base-input>
                              비밀번호
                              <base-input alternative
                                          type="password"
                                          placeholder="******"
                                          id="password"
                                          name="password"
                                          v-model="userInfo.password"
                                          >
                              </base-input>
                              이메일
                              <base-input alternative
                                          class="mb-3"
                                          placeholder="Email"
                                          type="text"
                                          id="email"
                                          name="email"
                                          v-model="userInfo.email"
                                          >
                              </base-input>
                              나이
                              <base-input alternative
                                          class="mb-3"
                                          placeholder="Age"
                                          type="number"
                                          id="age"
                                          name="age"
                                          v-model="userInfo.age"
                                          >
                              </base-input>
                              <div class="text-center">
                                  <base-button style="background-color: Tomato; border-color: Tomato;" type="primary" id="btn-signup" class="my-4" @click="userModify">정보 수정</base-button>
                                  <base-button style="background-color: Tomato; border-color: Tomato;" type="primary" id="btn-signup" class="my-4" @click="logout">로그아웃</base-button>
                              </div>
                          </form>
                      </template>
                  </card>
              </div>
          </div>
      </div>
  </section>
</template>

<script>

import { userInfo } from "os";
import { mapState, mapActions } from "vuex";

export default {
  name: "MyProfile",
  data() {
    return {
      user:{
        id: null,
        password: null,
        name: null,
        email: null,
        age: null,
      }
    };
  },
  computed: {
    ...mapState("userStore", ["isLogin","userInfo"]),
  },
  methods: {
    ...mapActions("userStore", ["getIdCheck", "upUser","userLogout"]),
    logout() {
      this.userLogout(this.userInfo.id);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "login" });
      console.log("userInfo : " + userInfo);
    },
    async userModify() {
      await this.upUser({
        name: this.userInfo.name,
        password: this.userInfo.password,
        id: this.userInfo.id,
        email: this.userInfo.email,
        age: this.userInfo.age,
      });
    },
  },
};
</script>

<style></style>
