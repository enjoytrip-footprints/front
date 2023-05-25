<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  components: {},
  data() {
    return {
      map: null,
      positions: [],
      markers: [],
    };
  },
  props: {
    chargers: [],
  },
  watch: {
    chargers() {
      console.log("관광지", this.chargers);
      this.positions = [];
      this.chargers.forEach((charger) => {
        let obj = {};
        // obj.title = charger.statNm;
        obj.firstimage = charger.firstimage;
        obj.title = charger.title;
        obj.latlng = new kakao.maps.LatLng(charger.mapy, charger.mapx);

        this.positions.push(obj);
      });
      this.loadMaker();
    },
  },
  created() {},
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    // console.log("window kakao : " + window.kakao);
    // console.log("window kakao maps : " + window.kakao.maps);
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      console.log("loadscript");
      this.loadScript();
    }
  },
  methods: {
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      console.log("kakao key : " + process.env.VUE_APP_KAKAO_MAP_API_KEY);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" + process.env.VUE_APP_KAKAO_MAP_API_KEY + "&autoload=false";
      // "//dapi.kakao.com/v2/maps/sdk.js?appkey=" + "7e5282ac1d8a24e34152ed2d9da0b6d2" + "&autoload=false";
      /* global kakao */
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      const container = document.getElementById("map");

      const options = {
        center: new window.kakao.maps.LatLng(37.501264, 127.039581),
        level: 3,
      };

      this.map = new window.kakao.maps.Map(container, options);

      let marker = new kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(37.501264, 127.039581), // 마커를 표시할 위치
        title: "SSAFY", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        //   image: markerImage, // 마커의 이미지
      });
      this.markers.push(marker);

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      var mapTypeControl = new kakao.maps.MapTypeControl();
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // this.loadMaker();
    },
    // 지정한 위치에 마커 불러오기
    loadMaker() {
      // 현재 표시되어있는 marker들이 있다면 marker에 등록된 map을 없애준다.
      // console.log("1111");
      this.deleteMarker();
      // console.log("2222");
      // 마커 이미지를 생성합니다
      //   const imgSrc = require("@/assets/map/markerStar.png");
      // 마커 이미지의 이미지 크기 입니다
      //   const imgSize = new kakao.maps.Size(24, 35);
      //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

      // 마커를 생성합니다
      this.markers = [];

      // this.positions.forEach((position) => {
      for (var i = 0; i < this.positions.length; i++) {
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: this.positions[i].latlng, // 마커를 표시할 위치
          title: this.positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          //   image: markerImage, // 마커의 이미지
          clickable: true,
        });
        this.markers.push(marker);

        var link = this.positions[i].firstimage;
        if (link == "") link = "https://web.yonsei.ac.kr/_ezaid/board/_skin/albumRecent/1/no_image.gif";
        var infowindow = new kakao.maps.InfoWindow({
          content: `${this.positions[i].title}<br/> <img src="${link}" alt="${this.positions[i].title}" width = "150px" height = "150px"/>`, // 인포윈도우에 표시할 내용
        });

        kakao.maps.event.addListener(marker, "mouseover", this.makeOverListener(this.map, marker, infowindow));
        kakao.maps.event.addListener(marker, "mouseout", this.makeOutListener(infowindow));
      }
      console.log("마커수 ::: " + this.markers.length);

      // 4. 지도를 이동시켜주기
      // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
      const bounds = this.positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);
    },
    deleteMarker() {
      console.log("마커 싹 지우자!!!", this.markers.length);
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          console.log(item);
          item.setMap(null);
        });
      }
    },

    makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    },
    makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>
