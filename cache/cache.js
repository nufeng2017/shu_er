/**
 * 管理storage存储数据
 * */ 
const storage = {//登记要存的数据
  "user_id":"user_id",//登录所存ID
};

export function setStorage (key,data){
  if (storage[key]){
    wx.setStorageSync(key, data);
  } else {
    throw new Error('所存数据需要在cache.js登记，避免数据混乱');
  }
}

export function getStorage (key){
  return wx.getStorageSync(key);
}