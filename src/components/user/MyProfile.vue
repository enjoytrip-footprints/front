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
          <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
            <template>
              <div class="text-muted text-center mb-3">{{ userInfo.name }} 님 안녕하세요</div>
            </template>
            <template>
              <form role="form">
                이 름
                <base-input alternative :class="nameValid" type="text" id="name" name="name" v-model="userInfo.name">
                </base-input>

                비밀번호
                <base-input
                  alternative
                  :class="pwdValid"
                  type="password"
                  placeholder="******"
                  id="password"
                  name="password"
                  v-model="pwd"
                >
                </base-input>

                비밀번호 확인
                <base-input
                  alternative
                  :class="pwdCheckValid"
                  type="password"
                  placeholder="******"
                  id="password"
                  name="password"
                  v-model="pwdCheck"
                  @keyup.enter="userModify"
                >
                </base-input>

                이메일
                <base-input
                  alternative
                  :class="emailValid"
                  placeholder="Email"
                  type="text"
                  id="email"
                  name="email"
                  v-model="userInfo.email"
                >
                </base-input>

                나이
                <base-input
                  alternative
                  :class="ageValid"
                  placeholder="Age"
                  type="number"
                  id="age"
                  name="age"
                  v-model="userInfo.age"
                >
                </base-input>

                <div class="text-center">
                  <base-button
                    style="background-color: Tomato; border-color: Tomato"
                    type="primary"
                    class="my-4"
                    @click="userModify"
                  >
                    정보 수정
                  </base-button>
                </div>

                <div class="text-center">
                  <base-button
                    style="background-color: Tomato; border-color: Tomato"
                    type="primary"
                    class="my-4"
                    @click="logout"
                  >
                    로그아웃
                  </base-button>
                  <base-button
                    style="background-color: crimson; border-color: Tomato"
                    type="primary"
                    id="btn-signup"
                    class="my-4"
                    @click="deleteUser"
                  >
                    회원탈퇴
                  </base-button>
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
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "MyProfile",
  data() {
    return {
      pwd: null,
      pwdCheck: null,
      nameValid: "input-success",
      emailValid: "input-success",
      pwdValid: null,
      pwdCheckValid: null,
      ageValid: "input-success",
      file: null,
      isEmail: true,
      pwdConfirm: false,
      /* eslint-disable-next-line */
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  computed: {
    ...mapState("userStore", ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations("userStore", ["SET_IS_LOGIN", "SET_USER_INFO", "SET_IS_VALID_TOKEN"]),
    ...mapActions("userStore", ["getIdCheck", "upUser", "userLogout", "userDelete"]),

    /**
     * 로그아웃
     */
    logout() {
      this.userLogout(this.userInfo.id);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "login" });
      console.log("userInfo : " + userInfo);
    },

    /**
     * 회원 정보 수정
     */
    async userModify() {
      if (!this.userInfo.name) {
        alert("이름을 입력해주세요!!");
        return;
      } else if (!this.userInfo.email) {
        alert("이메일을 입력해주세요!!");
        return;
      } else if (!this.pwd) {
        alert("비밀번호를 입력해주세요!!");
        return;
      } else if (!this.pwdCheck) {
        alert("비밀번호 확인을 입력해주세요!!");
        return;
      } else if (!this.isEmail) {
        alert("올바른 이메일 형식이 아닙니다!!");
        return;
      } else if (!this.pwdConfirm) {
        alert("비밀번호가 일치하지 않습니다!!");
        return;
      } else if (!this.userInfo.age) {
        alert("나이를 입력해주세요!!");
        return;
      } else {
        await this.upUser({
          name: this.userInfo.name,
          password: this.pwd,
          id: this.userInfo.id,
          email: this.userInfo.email,
          age: this.userInfo.age,
        });
      }
    },

    /**
     * 회원 탈퇴
     */
    async deleteUser() {
      if (confirm("회원을 탈퇴하시겠습니까?? \n삭제된 회원 정보는 다시 불러올 수 없습니다!!")) {
        await this.userDelete(this.userInfo.id);
        alert("회원 정보가 삭제되었습니다!!!");
        this.SET_USER_INFO(null);
        this.SET_IS_LOGIN(false);
        this.SET_IS_VALID_TOKEN(false);
        this.$router.push({ name: "login" });
      }
    },
  },
  watch: {
    "userInfo.name": function () {
      if (!this.userInfo.name) {
        this.nameValid = null;
      } else {
        this.nameValid = "input-success";
      }
    },
    "userInfo.email": function () {
      if (!this.userInfo.email) {
        this.emailValid = null;
        this.isEmail = false;
      } else if (!this.reg.test(this.userInfo.email)) {
        this.emailValid = "input-fail";
        this.isEmail = false;
      } else {
        this.emailValid = "input-success";
        this.isEmail = true;
      }
    },
    "userInfo.age": function () {
      if (!this.userInfo.age) {
        this.ageValid = null;
      } else {
        this.ageValid = "input-success";
      }
    },
    pwd() {
      if (!this.userInfo.password) {
        this.pwdValid = null;
      }
    },
    pwdCheck() {
      if (!this.pwdCheck) {
        this.pwdCheckValid = null;
        this.pwdConfirm = false;
      }
      if (this.pwdCheck == this.pwd) {
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

<style scoped>
.input-success {
  box-shadow: 0 0 5px green;
}
.input-fail {
  box-shadow: 0 0 5px red;
}
</style>
