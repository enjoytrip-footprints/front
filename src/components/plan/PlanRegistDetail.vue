<template>
  <section id="writeSchedule" class="pb-0" data-aos="zoom-in-up">
    <div class="container" style="min-height: 750px">
      <div class="section-header">
        <h2>여행 계획 작성</h2>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="mb-3">
            <label for="subject" class="form-label">제목 : </label>
            <input type="text" class="form-control" id="subject" name="subject" placeholder="제목..." v-model="title" />
          </div>
          <div class="mb-0">
            <label for="content" class="form-label">내용 : </label>
            <textarea
              class="form-control"
              id="content"
              name="content"
              rows="7"
              style="resize: none"
              placeholder="내용..."
              v-model="content"
            ></textarea>
          </div>
          <div class="mb-0">
            <div class="container p-0">
              <section class="py-5 pb-5">
                <ul class="timeline-with-icons ms-3" id="planInner">
                  <plan-regist-detail-item
                    v-for="(schedule, index) in schedules"
                    :key="schedule.spotid"
                    :schedule="schedule"
                    :num="index + 1"
                    ref="childCom"
                  ></plan-regist-detail-item>
                </ul>
              </section>
            </div>
          </div>
          <div class="col-auto text-center">
            <button
              type="button"
              id="btn-share"
              class="btn btn-default mb-3 mr-3"
              style="background: #0ea2bd; border: none"
              @click="share"
            >
              여행계획 작성하기
            </button>
            <button type="button" id="btn-cancel" class="btn btn-danger mb-3" @click="cancel">계획 취소하기</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import PlanRegistDetailItem from "@/components/plan/PlanRegistDetailItem";

export default {
  name: "PlanRegistDetail",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  components: {
    PlanRegistDetailItem,
  },
  computed: {
    ...mapState("planStore", ["schedules", "boardid"]),
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    ...mapMutations("planStore", ["CLEAR_BOARD_ID"]),
    ...mapActions("planStore", ["writeSchedule", "getBoardid", "writeScheduleSpot", "writePlanInfo"]),

    checkBlankParent() {
      for (var i = 0; i < this.$refs.childCom.length; i++) {
        if (this.$refs.childCom[i].checkBlank()) return true;
      }
      return false;
    },

    async share() {
      if (!this.title) {
        alert("제목을 입력해주세요!!!");
        return;
      } else if (!this.content) {
        alert("내용을 입력해주세요!!!");
        return;
      } else if (this.checkBlankParent()) {
        alert("세부 계획을 빠짐없이 입력해주세요 !!!");
        return;
      } else {
        // console.log(this.$refs.childCom.length);
        // for (var i = 0; i < this.$refs.childCom.length; i++) this.$refs.childCom[i].test();

        let board = {
          memberId: this.userInfo.id,
          planTitle: this.title,
          planDetail: this.content,
        };
        await this.writeSchedule(board);

        this.CLEAR_BOARD_ID();
        await this.getBoardid(this.userInfo.id);

        // for (var i = 0; i < this.schedules.length; i++) {
        //   var memo = document.querySelector(`#memo${i + 1}`).value;
        //   this.schedules[i].memo = memo;
        //   let scheduleSpot = {
        //     boardid: this.boardid,
        //     spotid: this.schedules[i].spotid,
        //     memo: this.schedules[i].memo,
        //   };
        //   this.writeScheduleSpot(scheduleSpot);
        // }
        var happyNum = 0;
        var priceNum = 0;
        for (var i = 0; i < this.$refs.childCom.length; i++) {
          await this.$refs.childCom[i].detailShare(this.boardid);

          happyNum += Number(this.$refs.childCom[i].happy);
          priceNum += Number(this.$refs.childCom[i].removeComma(this.$refs.childCom[i].price));
        }
        happyNum = Math.trunc(happyNum / this.$refs.childCom.length); // 평균

        let info = {
          memberId: this.userInfo.id,
          planId: this.boardid,
          priceSum: priceNum,
          happyAvg: happyNum,
        }

        await this.writePlanInfo(info);

        alert("여행 계획이 등록되었습니다.");
        this.$router.push("/tourplan");
      }
    },
    cancel() {
      if (confirm("정말 취소하시겠습니까?\n작성 내용은 저장되지 않습니다."))
        this.$router.push("/tourplan").catch(() => {});
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
ul {
  margin-left: 1rem;
}
</style>
