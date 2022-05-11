<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="logo py-4 d-flex justify-center">
                <NuxtLogo />
                <VuetifyLogo />
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
                <v-card-title class="headline" v-if="!user">
                    Sign In
                </v-card-title>
                <v-card-title v-if="is_login"> Hello! {{ user }} </v-card-title>
                <div>
                    <v-text-field
                        label="Email"
                        :rules="rules"
                        hide-details="auto"
                        v-model="user_info.email"
                        v-if="!is_login"
                    ></v-text-field>
                    <v-text-field
                        :rules="rules"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        label="Password"
                        v-model="user_info.password"
                        v-if="!is_login"
                    ></v-text-field>
                </div>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" nuxt to="/signUp" v-if="!is_login">
                        Sign Up
                    </v-btn>
                    <v-btn color="blue" @click="sign_in" v-if="!is_login">
                        Sign In
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'IndexPage',
    data() {
        return {
            rules: [
                (value) => !!value || 'Required.',
                (value) => (value && value.length >= 3) || 'Min 3 characters',
            ],

            show1: false,

            user_info: {
                email: '',
                password: '',
            },
        };
    },

    computed: {
        // user() {
        //     return this.$store.state.user;
        // },
        ...mapState(['user', 'is_login']),
    },

    mounted() {
        // this.test_token()
        // this.sign_up()
    },

    methods: {
        async test() {
            await this.$axios.post('/api');
        },

        async sign_in() {
            console.log('로그인 요청 감?');
            // 객체를 담아서 요청을 보냄 , 프로미스를 리턴받는 형태이기 때문에 try,catch를 사용해줘야 한다.
            try {
                let res = await this.$axios.post(
                    '/user/sign_in',
                    this.user_info
                );
                console.log(res);
                this.$store.commit('login', res.data);
                if (this.$store.state.is_login) {
                    console.log('로그인 성공');
                    console.log(this.$store);
                }
            } catch (e) {
                alert('No!!');
            }
        },

        // async test_token() {
        //     try {
        //         await this.$axios.post('/user/test_token_check',null, {
        //             headers: {
        //                 'x-access-token' : 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcnMiLCJpYXQiOjE2NTE1NjIyMDgsImV4cCI6MTY1MTU2MzEwOH0.8SLCSS3KVssf8GYK7idNn1WAOO8KH2-0_qKhZhM_vAOUlqUAHEgZ11lQNZ_s0PbHWT2CtfL-oGPehcQLCEmS9Q'
        //             }
        //         })
        //     } catch (error) {

        //     }
        // }
    },
};
</script>
