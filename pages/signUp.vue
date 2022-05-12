<template>
    <v-row>
        <v-col class="text-center">
            <img src="/v.png" alt="Vuetify.js" class="mb-5" />
            <blockquote class="blockquote">&#8220;Sign Up&#8221;</blockquote>
            <div>
                <v-text-field
                    label="Email"
                    hide-details="auto"
                    v-model="user_info.email"
                    :rules="rules"
                ></v-text-field>

                <v-text-field
                    :rules="rules"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    label="Password"
                    v-model="user_info.password"
                ></v-text-field>
                <v-text-field
                    :rules="rules"
                    label="Name"
                    v-model="user_info.name"
                ></v-text-field>
                <v-text-field
                    :rules="rules"
                    label="Phone Number"
                    v-model="user_info.phone"
                ></v-text-field>
            </div>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="sign_up"> Sign Up </v-btn>
            </v-card-actions>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'InspirePage',
    data() {
        return {
            rules: [
                (value) => !!value || "Required.",
                (value) => (value && value.length >= 3) || "Min 3 characters",
            ],

            show1: false,

            user_info: {
                email: '',
                password: '',
                name: '',
                phone: '',
            },
        };
    },
    methods: {
        async sign_up() {
            console.log('요청 감?');
            // 객체를 담아서 요청을 보냄 , 프로미스를 리턴받는 형태이기 때문에 try,catch를 사용해줘야 한다.
            try {
                await this.$axios.post('/user/sign_up', this.user_info, {
                    headres: {
                        'Content-Type': '',
                    },
                });
                this.$router.push('/');
            } catch (e) {}
        },
    },
};
</script>
