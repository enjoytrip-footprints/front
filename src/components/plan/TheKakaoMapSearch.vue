<template>
  <div>
    <div id="map"></div>

    <div id="menu_wrap" class="bg_white">
      <div class="option">
        <div>
          <!-- <form onsubmit="searchPlaces(); return false;"> -->
          키워드 :
          <input
            class="form-control pl-2"
            type="text"
            value=""
            id="keyword"
            placeholder="키워드 입력"
            style="line-height: 28px"
            @keyup.enter="searchKeyword()"
          />
          <button id="keyword_search" class="btn btn-default p-1" style="width: 20%" @click="searchKeyword()">
            <b-icon icon="search"></b-icon>
          </button>
          <!-- <button @click="loadMaker">검색하기</button>  -->
          <!-- </form> -->
        </div>
      </div>
      <hr />
      <ul id="placesList">
        <plan-search-item
          v-for="spot in searchSpots"
          :key="spot.spotid"
          :spot="spot"
          @click.native="callInfowindow(spot)"
          @dblclick.native="addSchedule(spot)"
        ></plan-search-item>
      </ul>
      <div id="pagination"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import PlanSearchItem from "@/components/plan/PlanSearchItem";

export default {
  name: "KakaoMap",
  components: { PlanSearchItem },
  data() {
    return {
      map: null,
      clusterer: null,
      polyline: null,
      infowindow: null,
      bounds: null,
      keyword: "",
      markers: [],
      linePath: [],
      sMarkers: [],
      sSchedules: [],
    };
  },
  computed: {
    ...mapState("planStore", ["searchSpots", "schedules"]),
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
    ...mapMutations("planStore", ["CLEAR_SEARCHSPOT_LIST", "CLEAR_SCHEDULE_LIST", "SET_SCHEDULE_LIST"]),
    ...mapActions("planStore", ["searchSpot"]),

    searchKeyword() {
      this.CLEAR_SEARCHSPOT_LIST();
      var keyword = document.querySelector("#keyword").value;
      this.searchSpot(keyword);
    },
    // selected(spot) {
    //   this.$refs.map.callInfowindow(spot);
    // },

    callInfowindow(spot) {
      this.deleteMarker();

      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(spot.latitude, spot.longitude), // 마커의 위치
      });

      var contentInfo = `<div class="overlay_info">
						<a><strong>${spot.title}</strong></a>
							<div class="desc">`;
      if (spot.first_image)
        contentInfo += `<img src="${spot.first_image}" alt="${spot.title}" width = "50px" height = "50px"/>`;
      else
        contentInfo += ` <img src="img/brand/foot23_purple.png" alt="${spot.title}" width = "50px" height = "50px"/>`;

      contentInfo += `<span class="address">${spot.addr1}</span></div>
      </div>`;

      this.map.setCenter(new kakao.maps.LatLng(spot.latitude, spot.longitude));
      this.map.setLevel(6);

      this.markers.push(marker);
      var placePosition = new kakao.maps.LatLng(spot.latitude, spot.longitude);
      marker = this.addMarker(placePosition, 0);
      // this.infowindow.setContent(content);
      // this.infowindow.open(this.map, marker);
      var infowindow = new kakao.maps.InfoWindow({
        // content: `${this.positions[i].title}<br/> <img src="${this.positions[i].firstimage}" alt="${this.positions[i].title}" width = "150px" height = "150px"/>`, // 인포윈도우에 표시할 내용
        content: contentInfo,
      });
      kakao.maps.event.addListener(marker, "mouseover", this.makeOverListener(this.map, marker, infowindow));
      kakao.maps.event.addListener(marker, "mouseout", this.makeOutListener(infowindow));
      // kakao.maps.event.addListener(marker, "rightclick", this.addSchedule(spot));
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

    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      // console.log("kakao key : " + process.env.VUE_APP_KAKAO_MAP_API_KEY);
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
      console.log("키워드 : " + this.keyword);
      this.deleteMarker();

      this.markers = [];

      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();
      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

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

    // 키워드 검색 함수

    // 키워드 검색을 요청하는 함수입니다
    searchPlaces() {
      // var keyword = document.getElementById('keyword').value;
      var keyword = this.keyword;
      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    },

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    },

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    displayPlaces(places) {
      var listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    },

    // 검색결과 항목을 Element로 반환하는 함수입니다
    getListItem(index, places) {
      var el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          "   <h5>" +
          places.place_name +
          "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    },

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position, idx, title) {
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      // markers.push(marker);  // 배열에 생성된 마커를 추가합니다

      return marker;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    },

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
    },

    displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    },

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    },

    addSchedule(spot) {
      let flag = true;
      for (let i = 0; i < this.sSchedules.length; i++) {
        if (this.sSchedules[i].spotid == spot.spotid) {
          flag = false;
        }
      }

      if (flag) {
        let schedule = {
          spotid: spot.content_id,
          title: spot.title,
          address: spot.addr1,
          image: spot.first_image,
          mapx: spot.latitude,
          mapy: spot.longitude,
          theme: spot.content_type_id,
        };

        this.sSchedules.push(schedule);
        this.SET_SCHEDULE_LIST(this.sSchedules);
        this.makeMarker();
        // this.makeLine();
      } else {
        alert("이미 추가한 장소입니다.");
      }
    },
    makeMarker() {
      let vm = this;
      this.sSchedules.forEach((schedule) => {
        var latlang = new kakao.maps.LatLng(schedule.mapx, schedule.mapy);
        var marker = new kakao.maps.Marker({
          position: latlang,
          image: new kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            new kakao.maps.Size(29, 42)
          ),
        });
        marker.setMap(this.map);
        marker.setZIndex(50);
        // kakao.maps.event.addListener(marker, "mouseover", function () {
        //   vm.displayInfowindow(marker, schedule);
        // });
        this.sMarkers.push(marker);
      });
    },
    // makeLine() {
    //   this.polyline.setMap(null);
    //   this.linePath = [];
    //   this.sSchedules.forEach((schedule) => {
    //     this.linePath.push(new kakao.maps.LatLng(schedule.mapx, schedule.mapy));
    //   });
    //   this.polyline = new kakao.maps.Polyline({
    //     path: this.linePath, // 선을 구성하는 좌표배열 입니다
    //     strokeWeight: 5, // 선의 두께 입니다
    //     strokeColor: "#0EA2BD", // 선의 색깔입니다
    //     strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    //     strokeStyle: "solid", // 선의 스타일입니다
    //   });
    //   this.polyline.setMap(this.map);
    // },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}

.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 500px;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
}
.bg_white {
  background: #fff;
}
#menu_wrap hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #5f5f5f;
  margin: 3px 0;
}
#menu_wrap .option {
  text-align: center;
}
#menu_wrap .option p {
  margin: 10px 0;
}
#menu_wrap .option button {
  margin-left: 5px;
}
#placesList li {
  list-style: none;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
#placesList .item h5,
#placesList .item .info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#placesList .item .info {
  padding: 10px 0 10px 55px;
}
#placesList .info .gray {
  color: #8a8a8a;
}
#placesList .info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;
}
#placesList .info .tel {
  color: #009900;
}
#placesList .item .markerbg {
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;
}
#placesList .item .marker_1 {
  background-position: 0 -10px;
}
#placesList .item .marker_2 {
  background-position: 0 -56px;
}
#placesList .item .marker_3 {
  background-position: 0 -102px;
}
#placesList .item .marker_4 {
  background-position: 0 -148px;
}
#placesList .item .marker_5 {
  background-position: 0 -194px;
}
#placesList .item .marker_6 {
  background-position: 0 -240px;
}
#placesList .item .marker_7 {
  background-position: 0 -286px;
}
#placesList .item .marker_8 {
  background-position: 0 -332px;
}
#placesList .item .marker_9 {
  background-position: 0 -378px;
}
#placesList .item .marker_10 {
  background-position: 0 -423px;
}
#placesList .item .marker_11 {
  background-position: 0 -470px;
}
#placesList .item .marker_12 {
  background-position: 0 -516px;
}
#placesList .item .marker_13 {
  background-position: 0 -562px;
}
#placesList .item .marker_14 {
  background-position: 0 -608px;
}
#placesList .item .marker_15 {
  background-position: 0 -654px;
}
#pagination {
  margin: 10px auto;
  text-align: center;
}
#pagination a {
  display: inline-block;
  margin-right: 10px;
}
#pagination .on {
  font-weight: bold;
  cursor: default;
  color: #777;
}
</style>
