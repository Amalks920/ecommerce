const axios=require('axios');


axios({
    method:'post',
    url:'/logout',
    data:{
        firstName:'amal',
        lastName:'ks'
    }
})