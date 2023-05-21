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
                              <small>발자취에 오신걸 환영합니다</small>
                          </div>
                      </template>
                      <template>
                          <form role="form">
                              <base-input alternative
                                          class="mb-3"
                                          placeholder="Id"
                                          addon-left-icon="ni ni-hat-3"
                                          type="text"
                                          id="signup-form-id"
                                          name="id"
                                          v-model="user.id"
                                          @keyup="checkId">
                              </base-input>
                              <base-input alternative
                                          type="password"
                                          :class="pwdValid"
                                          placeholder="Password"
                                          id="signup-form-pwd"
                                          name="password"
                                          addon-left-icon="ni ni-lock-circle-open"
                                          v-model="user.password">
                              </base-input>
                              <base-input alternative
                                          type="password"
                                          :class="pwdCheckValid"
                                          id="signup-form-pwd-confirm"
                                          placeholder="Password 확인"
                                          addon-left-icon="ni ni-lock-circle-open"
                                          v-model="pwdCheck"
                                          @keyup.enter="userJoin">
                              </base-input>
                              <div id="pwdcheck-result"></div>
                              <base-input alternative
                                          class="mb-3"
                                          placeholder="Email"
                                          addon-left-icon="ni ni-email-83"
                                          type="text"
                                          v-model="user.email">
                              </base-input>
                              <base-input alternative
                                          class="mb-3"
                                          placeholder="Name"
                                          addon-left-icon="ni ni-hat-3"
                                          type="text"
                                          v-model="user.name">
                              </base-input>
                              <base-input alternative
                                          class="mb-3"
                                          placeholder="Age"
                                          addon-left-icon="ni ni-hat-3"
                                          type="number"
                                          v-model="user.age">
                              </base-input>
                              <base-checkbox>
                                  <span>I agree with the
                                      <a style="color: Tomato;" href="#">Privacy Policy</a>
                                  </span>
                              </base-checkbox>
                              <div class="text-center">
                                  <base-button style="background-color: Tomato; border-color: Tomato;" type="primary" id="btn-signup" class="my-4" @click="userJoin">회원가입</base-button>
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
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "UserJoin",
  data() {
    return {
      idValid: null,
      nameValid: null,
      emailValid: null,
      pwdValid: null,
      pwdCheckValid: null,
      isUseId: false,
      isEmail: false,
      pwdConfirm: false,
      user: {
        id: null,
        password: null,
        name: null,
        email: null,
        age: null,
      },
      pwdCheck: null,
      /* eslint-disable-next-line */
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  computed: {
    ...mapState("userStore", ["idCheck"]),
  },
  methods: {
    ...mapGetters("userStore", ["checkIdCheck"]),
    ...mapActions("userStore", ["getIdCheck", "userSignup"]),

    checkId() {
      this.getIdCheck(this.user.id);
    },

    userJoin() {
      if (!this.user.id) {
        alert("아이디를 입력해주세요!!");
        return;
      } else if (!this.user.name) {
        alert("이름을 입력해주세요!!");
        return;
      } else if (!this.user.email) {
        alert("이메일을 입력해주세요!!");
        return;
      } else if (!this.user.password) {
        alert("비밀번호를 입력해주세요!!");
        return;
      } else if (!this.pwdCheck) {
        alert("비밀번호 확인을 입력해주세요!!");
        return;
      } else if (this.isUseId) {
        alert("이미 사용중인 아이디입니다!!");
        return;
      } else if (!this.isEmail) {
        alert("올바른 이메일 형식이 아닙니다!!");
        return;
      } else if (!this.pwdConfirm) {
        alert("비밀번호가 일치하지 않습니다!!");
        return;
      } else {
        this.userSignup(this.user);
      }
    },
  },
  watch: {
    "user.id": function () {
      if (!this.user.id) {
        this.idValid = null;
      } else if (this.user.id.length < 5 || this.user.id.length > 16) {
        this.idValid = "input-fail";
      } else {
        this.idValid = "input-success";
      }
    },
    idCheck() {
      if (this.idCheck == 0) {
        this.idValid = "input-success";
        this.isUseId = true;
      } else {
        this.idValid = "input-fail";
        this.isUseId = false;
      }
    },

    "user.name": function () {
      if (!this.user.name) {
        this.nameValid = null;
      } else {
        this.nameValid = "input-success";
      }
    },

    "user.email": function () {
      if (!this.user.email) {
        this.emailValid = null;
        this.isEmail = false;
      } else if (!this.reg.test(this.user.email)) {
        this.emailValid = "input-fail";
        this.isEmail = false;
      } else {
        this.emailValid = "input-success";
        this.isEmail = true;
      }
    },

    "user.password": function () {
      if (!this.user.password) {
        this.pwdValid = null;
      }
    },
    pwdCheck() {
      if (!this.pwdCheck) {
        this.pwdCheckValid = null;
        this.pwdConfirm = false;
      }
      if (this.pwdCheck == this.user.password) {
        this.pwdValid = "input-success";
        this.pwdCheckValid = "input-success";
        this.pwdConfirm = true;
      } else {
        this.pwdValid = "input-fail";
        this.pwdCheckValid = "input-fail";
        this.pwdConfirm = false;
      }
    },
  },
};
</script>

<style></style>
