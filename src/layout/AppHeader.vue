<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <!-- <router-link slot="brand" class="mr-lg-5" to="/"> -->
      <a href="/">
        <img src="img/brand/foot23.png" alt="logo" width="200px" height="100px" />
      </a>
      <!-- </router-link> -->

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <a href="/">
            <img src="img/brand/foot23_purple.png" alt="logo" width="200px" height="100px" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text">여행지</span>
          </a>
          <div class="dropdown-menu-inner">
            <router-link to="/toursearch" class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                <i class="ni ni-spaceship"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">여행지 검색</h6>
                <p class="description d-none d-md-inline-block mb-0">가고싶은 시/도, 구/군 별 관광지를 검색</p>
              </div>
            </router-link>
            <router-link to="/tourplan" class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                <i class="ni ni-ui-04"></i>
              </div>
              <div class="media-body ml-3">
                <h5 class="heading text-warning mb-md-1">여행 계획</h5>
                <p class="description d-none d-md-inline-block mb-0">나만의 여행계획을 정해보세요!</p>
              </div>
            </router-link>
          </div>
        </base-dropdown>

        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">여행 후기</span>
          </a>
          <router-link to="/hotReview/list" class="dropdown-item">인기 여행 후기</router-link>
          <router-link to="/review/list" class="dropdown-item">여행 후기</router-link>
        </base-dropdown>

        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">Q&A</span>
          </a>
          <router-link to="/board/list" class="dropdown-item"> 건의사항</router-link>
        </base-dropdown>

        <base-dropdown v-if="!userInfo" ag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">로그인</span>
          </a>
          <router-link to="/login" class="dropdown-item">로그인</router-link>
          <router-link to="/register" class="dropdown-item">회원가입</router-link>
        </base-dropdown>

        <base-dropdown v-if="userInfo" tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">마이페이지</span>
          </a>
          <router-link to="/myprofile" class="dropdown-item">내 정보</router-link>
          <router-link to="/myReview/list" class="dropdown-item">내 후기</router-link>
        </base-dropdown>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import { mapState } from "vuex";
import BaseNav from "@/components/base/BaseNav";
import BaseDropdown from "@/components/base/BaseDropdown";
import CloseButton from "@/components/base/CloseButton";

export default {
  name: "AppHeader",
  computed: {
    ...mapState("userStore", ["isLogin", "userInfo"]),
  },
  methods: {},
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
};
</script>
<style></style>
