export default ({app}, inject) => {

    inject('validation', ({value,min,max}) => {
        const valueCheck = value;
        const error = [];

        // //숫자만
        // const pattern_num = /^[0-9]+$/;	// 숫자 
        //영어만
        const pattern_eng = /^[a-zA-Z]+$/;	// 문자 
        //숫자포함
        let patten_include_num = /[0-9]/;
        //영어포함
        let patten_include_eng = /[a-zA-Z]/;
        let pattern_eng_capital = /[A-Z]/
        //특수문자
        const pattern_spc = /[~!@#$%^&*()_|<>?:{}]/; // 특수문자
        //한글
        const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
        //온전한 한글
        const pattern_kor_completed = /[(ㄱ-ㅎㅏ-ㅣ)]/ // 한글 완전한 글자 체크
        //url
        const pattern_url = new RegExp('^(https?:\\/\\/)?'+ // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        //공백
        const pattern_blank = /[\s]/g;	// 	공백

        //email
        const pattern_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        return {
            // 필수 입력
            required() {
                if(['', null, undefined].indexOf(valueCheck) !== -1 || (!valueCheck && !valueCheck.trim())){
        			error.push('필수 입력 입니다.');
        		}
        		return this;
            },
            //특수문자 입력불가
        	restrict_simbol(){
        	    if(pattern_spc.test(valueCheck)){
        	        error.push('특수 문자는 입력 불가합니다.');
        	    }
        	    return this;
        	},
            //숫자 입력불가
        	restrict_num(){
        	    if(patten_include_num.test(valueCheck)){
        	        error.push('숫자는 입력 불가합니다.');
        	    }  
        	    return this;
        	},
            //영문 입력불가
        	restrict_eng(){
        	    if(patten_include_eng.test(valueCheck)){
        	        error.push('영문은 입력 불가합니다.');
        	    }  
        	    return this;
        	},
            //공백 입력불가 
            restrict_blank(){
                if(valueCheck.match(pattern_blank)){
                    error.push('공백 입력 불가합니다.');
                }  
                return this;
        	},
            //최대 길이 제한
            restrict_max(){
        		if(valueCheck.length > max){
        			error.push('길이가 너무 길어요.');
        		}
    				return this;
        	},
            //최소 길이제한
        	length_min(){
    	    	if(valueCheck.length < min){
        			error.push('길이가 너무 짧아요.');
        		}
    			return this;
        	},
            //숫자만 입력
        	only_num(){
                if(isNaN(valueCheck)){
                    error.push('숫자만 입력해 주세요');
                }
                return this;
        	},
            only_capital_eng(){
                if(pattern_eng_capital.test(valueCheck)){
                    error.push('대문자로 입력해주세요');
                }
                return this;
            },
            //영어만 입력
            only_english(){
                if(!pattern_eng.test(valueCheck)){
                    error.push('영문만 입력해주세요');
                }
                return this;
            },
            //한글 입력 제한
        	restrict_kor(){
                if(valueCheck.match(pattern_kor)){
                    error.push('한글 입력 불가합니다.');
                }  
                return this;
        	},
            //url 체크
        	check_url(){
                if(['', null, undefined].indexOf(valueCheck) === -1){
                    if(!pattern_url.test(valueCheck)){
                        error.push('URL을 확인해 주세요');  
                    }
                }
               return this;
        	},
            //url email 체크
        	check_email(){
                if(valueCheck == ''){
                    return this
                }
                if(!pattern_email.test(valueCheck)){
                    error.push('Email을 확인해 주세요');  
                }
               return this;
        	},
            //온전한 한글 체크
            only_complete_kor(){
              if(pattern_kor_completed.test(valueCheck)){
                error.push('온전한 한글로 써주세요');    
              }  
              return this;
            },
            //체크한 에러 반환(어레이) 
        	error(){
        	    if(error.length > 0){
        	       return error; 
        	    }else{
        	        return null;
        	    }
        	    
        	},
            //에러 있는지 없는지만
            validate(){
        	    if(error.length > 0){
        	       return false; 
        	    }else{
        	        return true;
        	    }
        	    
        	},
        }
    })
}