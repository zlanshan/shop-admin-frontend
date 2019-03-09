import axios from "axios";

// 专门用于存储用户的数据，和修改用户数据的方法
export default {
    // 命名空间
    namespaced: 'user',
    state: {
        username: '',
        identity: ''
    },
    actions: {
        // 这里面的this指向的是这个实例而不是app.vue中的实例
        login({ commit, state }, data) {
            axios({
                method: 'post',
                url: '/admin/account/login',
                data,
                withCredentials: true,
            }).then(res => {
                //  在这里message是用户登录的信息，，不是提示类的信息
                const { status, message } = res.data;
                if (status === 0) {
                    //  this.$message({
                    //    message:'登录成功',
                    //    type:'success'
                    //  })
                    alert('登录成功');
                    state.username = message.uname;
                    state.identity = message.realname;
                    window.history.back();
                    //  this.$router.back();
                } else {
                    alert('登录失败，请重新登录');
                    //  this.$message({
                    //    message:message,
                    //    type:'warning'
                    //  })
                }
            })
        },
    }
}