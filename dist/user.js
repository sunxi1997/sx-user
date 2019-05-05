import Event from "sx-event";

export default class User {
   constructor() {
      this.event = new Event()
      this._userInfo = null
   }

   /**
    * @method getUserInfo - 获取用户信息
    *
    * @param {Boolean} sync = false - 是否立即获取
    *
    * @return {Object|Null|Promise} - 若立即获取，返回值为当前用户数据（可能为空），否则返回值为Promise，当用户数据不为空时resolve
    */
   getUserInfo(sync = false) {
      return sync ? this._userInfo :
         new Promise((resolve) => {
            let event = this.event;
            this._userInfo ?
               resolve(this._userInfo) :
               event.$on('setUserInfo', onInit)
            function onInit(userInfo) {
               event.$off('setUserInfo', onInit)
               onInit = event = null;
               resolve(userInfo);
            }
         })
   }

   /**
    * @method setUserInfo - 更新用户信息
    *
    * @param {Object} userInfo - 新的用户数据
    *
    */
   setUserInfo(userInfo) {
      if(!userInfo || typeof userInfo !== 'object')
         return console.error(userInfo,'is not a object!')
      this._userInfo = Object.assign(this._userInfo || {},userInfo)
      this.event.$emit('setUserInfo',userInfo)
   }
}
