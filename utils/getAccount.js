import { getAccount } from '../main/network/recharge.js';
import { getStorage, setStorage } from '../cache/cache.js';

export default function resetUserAccount() {
  if (getStorage('user_id')){
    return new Promise((resolve, reject) => {
      getAccount({
        user_id: getStorage('user_id')
      }).then((res) => {
        let user_info = getStorage('user_info');
        user_info.account = res.data.data.account;
        setStorage('user_info', user_info);
        resolve(res);
      })
    });
  }
}