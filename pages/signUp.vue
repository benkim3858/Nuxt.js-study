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
                    :class="error.email ? 'nonproper' : 'proper'"
                >
                    <b>Check Your E-mail.</b>
                </v-text-field>

                <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    label="Password"
                    v-model="user_info.password"
                ></v-text-field>
                <v-text-field
                    label="Name"
                    v-model="user_info.name"
                    :class="error.name ? 'nonproper' : 'proper'"
                >
                    <b>Check Your Name.</b>
                </v-text-field>
                <v-text-field
                    label="Phone Number"
                    v-model="user_info.phone"
                    :class="error.phone ? 'nonproper' : 'proper'"
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
            // rules: [
            //     (value) => !!value || "Required.",
            //     (value) => (value && value.length >= 3) || "Min 3 characters",
            // ],

            show1: false,

            user_info: {
                email: '',
                password: '',
                name: '',
                phone: '',
            },

            error: {},
        };
    },
    methods: {
        async sign_up() {
            console.log('요청 감?');
            let validate_result = this.validate_common();
            console.log(validate_result);
            if (!validate_result) {
                return;
            }

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

        validate_common() {
            this.$set(
                this.error,
                'email',
                !this.$validation({ value: this.user_info.email })
                    .required()
                    .check_email()
                    .validate()
            );
            this.$set(
                this.error,
                'name',
                !this.$validation({ value: this.user_info.name })
                    .required()
                    .validate()
            );
            this.$set(
                this.error,
                'phone',
                !this.$validation({ value: this.user_info.phone })
                    .required()
                    .validate()
            );

            for (let err in this.error) {
                console.log(err);
                console.log(this.error[err]);
                if (this.error[err]) {
                    window.scrollTo(0, 0);
                    return false;
                }
            }
            return true;
        },
    },
};
</script>
<style lang="scss">

</style>