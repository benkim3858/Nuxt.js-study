<template>
    <div>
        <div
            class="col-xs-4"
            id="talkjs-container"
            ref="talkjs-container"
            style="width: 90%; margin-top: 10px; height: 900px"
        >
            <i>Loading chat...</i>
        </div>
    </div>
</template>

<script>
import Talk from 'talkjs';
export default {
    name: 'MessageBox',
    data() {
        return {
            conversation: null,
            chatbox: null,
        };
    },
    props: {
        currentUser: {
            type: Object,
            required: true,
        },
    },

    mounted() {
        Talk.ready.then(() => {
            // creating our user
            let me = new Talk.User({
                id: this.currentUser.id,
                name: this.currentUser.name,
                email: this.currentUser.email,
                photoUrl: 'https://randomuser.me/api/portraits/men/83.jpg',
                role: 'default',
            });

            // creating other users
            let other = new Talk.User({
                id: '654321',
                name: 'Sebastian',
                email: 'Sebastian@example.com',
                photoUrl: 'https://randomuser.me/api/portraits/men/69.jpg',
                welcomeMessage: 'Hey, how can I help?',
                role: 'default',
            });

            // establishing a new session if one doesn\'t already exists*
            if (!window.talkSession) {
                window.talkSession = new Talk.Session({
                    appId: 'tbgxCkGH',
                    me: me,
                });
            }

            // connecting to a new or already existing conversation
            this.conversation = window.talkSession.getOrCreateConversation('1001');
            this.conversation.setAttributes({
                subject: 'Computational Theory 101',
            });

            // adding participants
            this.conversation.setParticipant(me);
            this.conversation.setParticipant(other);

            // creating the actual inbox/chatbox
            this.inbox = window.talkSession.createInbox({
                selected: this.conversation,
            });
            this.inbox.mount(this.$refs["talkjs-container"]);
        });
        
    },

    methods: {},
};
</script>

<style lang="scss" scoped>
</style>

