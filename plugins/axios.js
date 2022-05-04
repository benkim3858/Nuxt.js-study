let token_refreshing = null;

export default ({ app, $axios, store, redirect, root}) => {
    // Add a request interceptor 요청 인터셉터 추가
    $axios.interceptors.request.use(function (config) {

    // Do something before request is sent 요청이 전송되기 전에 수행
    config.headers['x-access-token'] = store.state.token.access_token //유저가 로그인할때 받은 토큰
    config.headers['Content-Type'] = 'application/json'

    return config;
    }, function (error) {
        
        // Do something with request error 요청 오류가 있는 작업 수행
        return Promise.reject(error);
    });

    // Add a response interceptor 응답 인터셉터 추가
    $axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // 2xx 범위 내에 있는 모든 상태 코드로 인해 이 기능이 트리거됩니다.
        // Do something with response data
        // 응답 데이터로 작업 수행
        return response;
    }, async function (error) {
        let originalRequest = error.config
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // 2xx 범위를 벗어나는 모든 상태 코드로 인해 이 기능이 트리거됩니다.
        // Do something with response error
        // 응답 오류가 있는 작업 수행
        if(error.response.status === 401) {
            console.log("토큰 만료")

            // 토큰이 없는 유저
            if(!store.state.token) {
                alert("접근 권한이 없습니다.")
                app.router.push('/')
            }

            // 토큰 만료 유저
            try {
                const config = { headers: {'x-refresh-token': store.state.token.refresh_token}};
                token_refreshing = token_refreshing ? token_refreshing : $axios.post('/refresh_token', {}, config);
                let res = await token_refreshing;
                store.commit('set_token', res.data)
                token_refreshing = null;
                
                return $axios(originalRequest);

            } catch (error) {
                console.log("리프레시 토큰 요청 실패");
                console.log(error);
                
                // app.router.push('/');
                return
            }
        }
        
        console.log(error);
        console.log(error.response.data);
        return Promise.reject(error);
    });
}