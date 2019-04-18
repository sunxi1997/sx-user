import Event from "sx-event";

export default class User {
   constructor() {
      this.event = new Event()
      this._userInfo = null
   }

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

   setUserInfo(userInfo) {
      if(!userInfo || typeof userInfo !== 'object')
         return console.error(userInfo,'is not a object!')
      this._userInfo = Object.assign(this._userInfo || {},userInfo)
      this.event.$emit('setUserInfo',userInfo)
   }
}
