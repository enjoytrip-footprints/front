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
                              <base-input alternative
                                          :class="nameValid"
                                          addon-left-icon="ni ni-hat-3"
                                          type="text"
                                          id="name"
                                          name="name"
                                          v-model="userInfo.name">
                              </base-input>
                              <base-input alternative
                                          :class="pwdValid"
                                          type="password"
                                          placeholder="Password"
                                          id="password"
                                          name="password"
                                          v-model="userInfo.password"
                                          addon-left-icon="ni ni-lock-circle-open">
                              </base-input>
                              <base-input alternative
                                          :class="pwdCheckValid"
                                          type="password"
                                          placeholder="Password"
                                          id="password"
                                          name="password"
                                          v-model="userInfo.password"
                                          addon-left-icon="ni ni-lock-circle-open"
                                          >
                              </base-input>
                              <base-input alternative
                                          class="mb-3"
                                          placeholder="Email"
                                          addon-left-icon="ni ni-email-83"
                                          type="text"
                                          id="email"
                                          name="email"
                                          v-model="userInfo.email">
                              </base-input>
                              <base-input alternative
                                          class="mb-3"
                                          placeholder="Age"
                                          addon-left-icon="ni ni-hat-3"
                                          type="number"
                                          id="age"
                                          name="age"
                                          v-model="userInfo.age">
                              </base-input>
                              <div class="text-center">
                                  <base-button 
                                    style="background-color: Tomato; border-color: Tomato;" 
                                    type="primary"
                                    class="my-4">
                                    정보 수정
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
import { mapState } from "vuex";
export default {
  name: "MyProfile",
  data() {
    return {
      name: "",
      password: "",
      email: "",
      age: "",
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
};
</script>

<style>
  .input-success {
  box-shadow: 0 0 5px green;
  }
.input-fail {
  box-shadow: 0 0 5px red;
  }
</style>
