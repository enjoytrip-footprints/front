import http from "@/util/http-common";

const commentStore = {
    namespaced: true,
    state: {
        comments: [],
    },
    mutations: {
        SET_COMMENTS(state, comments) {
            state.comments = comments;
        },
    },
    actions: {
        getComments({ commit }, reviewId) {
            console.log(reviewId);
            http.get(`comment/${reviewId}`)
            .then(({ data }) => {
            commit("SET_COMMENTS", data);
            })
            .catch(() => {
            alert("댓글목록: 에러발생!");
            });
        },
        async regComment(context, comment) {
            await http.post("comment", comment)
            .then(({ data }) => {
                let msg = "등록 처리시 문제가 발생했습니다.";
                if (data === "success") {
                msg = "등록이 완료되었습니다.";
                }
                alert(msg);
            });
        },
        async modComment(context, comment) {
            await http.put(`comment`, comment)
            .then(({ data }) => {
                let msg = "수정 처리시 문제가 발생했습니다.";
                if (data === "success") {
                msg = "수정이 완료되었습니다.";
                }
                alert(msg);
            });
        },
        async delComment(context, id) {
            await http.delete(`comment/${id}`)
            .then(({ data }) => {
                let msg = "삭제 처리시 문제가 발생했습니다.";
                if (data === "success") {
                msg = "삭제가 완료되었습니다.";
                }
                alert(msg);
            });
        },
    },
};
export default commentStore;