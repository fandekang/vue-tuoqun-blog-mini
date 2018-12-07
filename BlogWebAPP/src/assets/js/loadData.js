import utils from './utils';

function responseSuccess(response, success) {
    let body = JSON.parse(response.bodyText);
    if(body && body.success) {
        success && success.call(this, response);
    }
    else if (body) {
        this.$toast(body.errorMsg);
    }
    else {
        this.$toast("服务端返回了错误的类型");
    }
}

function responseError(response, error) {
    if (response.status === 604) {
        this.$toast({
            message: "您还没有登陆或超时登陆",
            position: 'top'
        });
        this.$store.commit("togglePopup", {loginPopup: true});
        this.$store.commit("toggleUser", {title: "登陆"});
        // this.$router.push({name: "Login"});
    }
    else {
        error && error.call(this, response);
    }
}

export default {
    methods: {
        /***
         * 发送get请求
         *
         * @param options
         *          url:        url
         *          param:      param
         *          success:    success 表示后端返回成功时执行
         *          error:      error   表示请求发送失败时候执行，预处理了604超时登陆的情况
         *          resolve:    resolve 表示请求发送成功时候执行，后端可能会有异常传递到前端
         *          reject:     reject  表示请求发送失败时候执行
         *
         * @returns {Promise.<TResult>|*}
         */
        sendGet(options) {
            let _this = this, url = options.url, param = options.param,
                success = options.success, error = options.error,
                resolve = options.resolve, reject = options.reject,
                paramStr = '', icon = url && url.indexOf('?') > -1 ? '&' : '?',
                indicator = this.$indicator;

            for(let key in param) {
                let value = param[key];
                paramStr += paramStr === '' ? `${icon}${key}=${value}` : `&${key}=${value}`;
            }

            indicator.open();
            return _this.$http.get(url + paramStr, {emulateJSON: true}).then(response => {
                if(resolve && utils.getType(resolve) === "FUNCTION") {
                    resolve.call(this, response);
                }
                else {
                    responseSuccess.call(this, response, success);
                }
                setTimeout(function() {
                    indicator.close();
                }, 500);
            }, response => {
                setTimeout(function() {
                    indicator.close();
                }, 500);
                if(reject && utils.getType(reject) === "FUNCTION") {
                    reject.call(this, response);
                }
                else {
                    responseError.call(this, response, error);
                }
            });
        },
        /***
         * 发送post请求
         *
         * @param options
         *          url:        url
         *          param:      param
         *          success:    success 表示后端返回成功时执行
         *          error:      error   表示请求发送失败时候执行，预处理了604超时登陆的情况
         *          resolve:    resolve 表示请求发送成功时候执行，后端可能会有异常传递到前端
         *          reject:     reject  表示请求发送失败时候执行
         *
         * @returns {Promise.<TResult>|*}
         */
        sendPost(options) {
            let _this = this, url = options.url, param = options.param,
                success = options.success, error = options.error,
                resolve = options.resolve, reject = options.reject,
                indicator = this.$indicator;

            if(param && utils.getType(param) !== "OBJECT") {
                console.error("invalid argument of 'param'");
            }

            indicator.open();
            return _this.$http.post(url, param, {emulateJSON: true}).then(response => {
                if(resolve && utils.getType(resolve) === "FUNCTION") {
                    resolve.call(this, response);
                }
                else {
                    responseSuccess.call(this, response, success);
                }
                setTimeout(function() {
                    indicator.close();
                }, 500);
            }, response => {
                setTimeout(function() {
                    indicator.close();
                }, 500);
                if(reject && utils.getType(reject) === "FUNCTION") {
                    reject.call(this, response);
                }
                else {
                    responseError.call(this, response, error);
                }
            });
        }
    }
}
