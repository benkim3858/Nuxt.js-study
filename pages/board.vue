<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="logo py-4 d-flex justify-center">
                <NuxtLogo />
            </v-card>
            <v-card>
                <v-card-title class="headline">
                    Welcome to the Vuetify + Nuxt.js Study Project
                </v-card-title>
                <v-card-text>
                    <p>
                        Vuetify is a progressive Material Design component
                        framework for Vue.js. It was designed to empower
                        developers to create amazing applications.
                    </p>
                </v-card-text>
                
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "IndexPage",
    data() {
        return {
            rules: [
                (value) => !!value || "Required.",
                (value) => (value && value.length >= 3) || "Min 3 characters",
            ],

            show1: false,

            user_info: {
                email: "",
                password: "",
            },
        };
    },

    mounted() {
        // this.test()
        // this.sign_up()
    },

    methods: {
        async test() {
            await this.$axios.post("/api");
        },

        async sign_in() {
            console.log("로그인 요청 감?");
            // 객체를 담아서 요청을 보냄 , 프로미스를 리턴받는 형태이기 때문에 try,catch를 사용해줘야 한다.
            try {
                let res = await this.$axios.post("/user/sign_in", this.user_info);
                console.log(res)
                // if(res.result) {
                //     alert("Hi!")
                // }
                console.log("로그인 성공")
            } catch (e) {}
        },
    },
};
</script>
