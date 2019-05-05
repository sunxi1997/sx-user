# User

用户数据存取

## 安装

````
npm install sx-event
````

## 使用

````
import User from 'sx-user'

// 立即获取

let userInfo1 = User.getUserInfo(true); 
console.log(userInfo1);    // null 因为这时候还没有用户数据


// Promise 获取，别担心，Promise回调中必定获取到用户数据

User.getUserInfo().then(userInfo2=>{
    
    console.log(userInfo2);    // {id:0,name:'faker'}
    
    ... // 这里可以做获取到用户数据后的操作，比如请求购物车数据，而不用担心用户数据存储的异步问题

});// 你甚至不用考虑错误情况，Promise一定会等到用户数据存在后才执行resolve


// 延时一段时间后（模拟异步请求），获取到了用户数据

setTimeout(()=>{

    let userInfo = {
        id:0,
        name:'faker'
    };
   
    User.setUserInfo(userInfo); // 保存用户数据
    
    // 这时再立即获取也可以获取到
    let userInfo3 = User.getUserInfo(true);
    console.log(userInfo3);      // {id:0,name:'faker'}
    
},5000)



````

上面的代码可能有些多。。。

那么用一个简单的请求购物车例子来试一下

````
 
// 这是一个获取购物车数据的函数，需要的参数是用户数据

function getCartData(userInfo){
    ...
}
 

// 需求：获取到用户数据后执行获取购物车操作。
// 那么只需要两步
    
// 1 引入
import User from 'sx-user' 

// 2 一句话
User.getUserInfo().then(getCartData); // 只要任意页面引入User调用了setUserInfo,这里就会立即得到响应
    
    
````