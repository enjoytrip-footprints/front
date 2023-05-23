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
                            <div class="text-center text-muted mb-4">
                                <small>어서오세요</small>
                            </div>
                            <form role="form">
                                <base-input 
                                id="login-form-id"
                                name="id"
                                v-model="user.id"
                                required
                                placeholder="아이디"
                                @keyup.enter="confirm">
                                </base-input>
                                <base-input 
                                type="password"
                                id="login-form-pw"
                                name="pwd"
                                v-model="user.password"
                                required
                                placeholder="비밀번호 입력...."
                                @keyup.enter="confirm">
                                </base-input>
                                <base-checkbox>
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button 
                                      style="background-color: Tomato;
                                      border-color: Tomato;"
                                      type="primary"
                                      class="my-4"
                                      @click="confirm">
                                      로그인
                                    </base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                            </a>
                        </div>
                        <div class="col-6 text-right" @click="moveJoin">
                            <a class="text-light">
                                <small style="color: white;">
                                  Create new account
                                </small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "UserLogin",
  data() {
    return {
      user: {
        id: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState("userStore", ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations("userStore", ["SET_IS_LOGIN_ERROR"]),
    ...mapActions("userStore", ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "components" });
      }
    },
    moveJoin() {
      this.$router.push({ name: "register" });
    },
  },
  mounted() {
    this.SET_IS_LOGIN_ERROR(false);
  },
};
</script>

<style></style>
