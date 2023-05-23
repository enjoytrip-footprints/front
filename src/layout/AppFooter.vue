<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row row-grid align-items-center my-md">
      </div>
      <hr />
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ year }} <a href="https://github.com/Judgement9882" target="_blank" rel="noopener">JunYoung</a> &
            <a href="https://github.com/yeonx" target="_blank" rel="noopener">YeonHee</a>
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a href="https://github.com/enjoytrip-footprints" class="nav-link" target="_blank" rel="noopener">github</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "app-footer",
    data() {
      return {
        year: new Date().getFullYear(),
      };
    },
  };
</script>

<style></style>
