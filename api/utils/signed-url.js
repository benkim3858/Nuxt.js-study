const cf = require('aws-cloudfront-sign');
const path = require('path');
const {configPath} = process.env;

module.exports = {
    get : function() {
        const option = {
            keypairId : 'K3QHG7XURKHXZ4',
            privateKeyPath : path.join(configPath, 'private_key.pem'),
            expireTime : new Date(2022, 12, 31)
        }
        const signedUrl = cf.getSignedUrl('https://d155rgiwvxmktz.cloudfront.net/CLASS101_save/main_1080p30-test.m3u8', options);
        const signedCookies = cf.getSignedCookies('https://d155rgiwvxmktz.cloudfront.net/*', options);
        console.log({signedUrl, signedCookies});
        return {signedUrl, signedCookies};
    },
    create : function(url) {
        const options = {
            keypairId : 'K3QHG7XURKHXZ4',
            privateKeyPath: path.join(configPath, 'private_key.pem'),
            expireTime : Date.now() + 2 * 60 * 60 * 1000 
        }
        const signedUrl = cf.getSignedUrl(url, options);
        return signedUrl;
    }
}