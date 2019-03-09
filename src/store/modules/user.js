import axios from "axios";

// 专门用于存储用户的数据，和修改用户数据的方法
export default {
    // 命名空间
    namespaced: 'user',
    // 这个state中的数据如果没有设置缓存的话，第二次刷新后就显示不了这个数据
    // 同时最开始是没有缓存数据的，如果直接是获取本地存储的，就没有值，因而还需不成立时添加空字符串
    state: {
        username: localStorage.getItem('username') || "",
        identity: localStorage.getItem('identity') || ""
    },
    actions: {
        // 这里面的this指向的是这个实例而不是app.vue中的实例
        login({ commit, state }, data) {
            new Promise((resolve, rejuct) => {
                axios({
                    method: 'post',
                    url: '/admin/account/login',
                    data,
                    withCredentials: true,
                }).then(res => {
                    const { status, message } = res.data;
                    if (status === 0) {
                        // alert('登录成功');
                        state.username = message.uname;
                        state.identity = message.realname;
                        localStorage.setItem('username', message.uname);
                        localStorage.setItem('identity', message.realname);
                        // 这个是login中部態添加第三个参数，我们不能直接跳转到你想要的界面时，
                        // 需借用Promise中的功能实现
                        resolve();
                        // window.history.back();
                        //  this.$router.back();
                    } else {
                        // alert('登录失败，请重新登录');
                    }
                })
            })
        },


        exit({ commit }, fn) {
            axios({
                method: 'get',
                url: '/admin/account/logout',
                withCredentials: true
            }).then(res => {
                console.log(res);
                const { message, status } = res.data;
                if (status === 0) {
                    localStorage.removeItem('username');
                    localStorage.removeItem('identity');
                    fn();
                }
            })


        }
    }
}