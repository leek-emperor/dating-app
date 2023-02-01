import {PermissionsAndroid} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';
import axios from 'axios';
class Geo {
  async initGeo() {
    // 对于 Android 需要自行根据需要申请权限
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    // 使用自己申请的高德 App Key 进行初始化
    await init({
      ios: 'd2b6e0497b7bd66a358548b18a581b50',
      android: 'd2b6e0497b7bd66a358548b18a581b50',
    });
    return Promise.resolve();
  }

  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log('开始定位');
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve(coords);
        },
        err => reject(err),
      );
    });
  }

  async getCityByLocation() {
    const {latitude, longitude} = (await this.getCurrentPosition()) as any;
    const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      params: {
        location: `${longitude},${latitude}`,
        key: 'c23d784418ac32d231b844b9457eb03c',
      },
    });
    return Promise.resolve(res.data);
  }
}
export default new Geo();
