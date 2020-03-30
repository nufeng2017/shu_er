import { addCart } from '../../network/shop-item.js';
import { getStorage, setStorage } from '../../../cache/cache.js';
Component({
  properties: {
    item: {
      type: Object,
    },
    linkType: {//转跳链接类型
      type: String,
      value: 'navigateTo'
    },
    link: {//转跳链接
      type: String,
      value: ''
    },
    defaultImage:String
  },
  methods: {
    enterPage() {
      switch (this.data.linkType) {
        case 'navigateTo':
          wx.navigateTo({
            url: this.data.link
          })
          break;
        case 'reLaunch':
          wx.reLaunch({
            url: this.data.link
          })
          break;
        case 'switchTab':
          wx.switchTab({
            url: this.data.link
          })
          break;
        case 'redirectTo':
          wx.redirectTo({
            url: this.data.link
          })
          break;
      }
    },
    addCar(e){
      if (!wx.getStorageSync('user_id')) {
        wx.navigateTo({
          url: '/main/pages/logs/logs',
        });
        return;
      } 
      let item = e.currentTarget.dataset.item;
      addCart({
        user_id: wx.getStorageSync('user_id'),
        type:item.type,
        pid:item.pid,
        num:1
      }).then((res)=>{
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        let car_list = getStorage('car_list');
        if (!Array.isArray(car_list)){
          car_list = [];
        } 
        item.num = 1;
        for (let i = 0; i < car_list.length; i++) {
          if (car_list[i].pid == item.pid) {
            car_list[i].num = parseInt(car_list[i].num) + 1;
            setStorage('car_list', car_list);
            return;
          }
        }
        car_list.push(item);
        setStorage('car_list', car_list);
      });
    }
  }
})