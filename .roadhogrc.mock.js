import mockjs from 'mockjs';
import {getRule, postRule} from './mock/rule';
import {getActivities, getNotice, getFakeList} from './mock/api';
import {getDistricts} from './mock/districts';
import {format, delay} from 'roadhog-api-doc';

const noProxy = process.env.NO_PROXY === 'true';

const getRandomInRange = function (from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const data = {
  "type": "FeatureCollection",
  "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
  "features": []
};

for (let i = 0; i < 100; i++) {
  data.features.push({
    "type": "Feature",
    "properties": {
      "id": "ak16994521",
      "mag": getRandomInRange(1, 10000, 1),
      "time": 1507425650893,
      "felt": null,
      "tsunami": 0
    },
    "geometry": {
      "type": "Point",
      "coordinates": [getRandomInRange(-0.1, -0.2, 5), getRandomInRange(51.5, 51.63292, 5)]
    }
  })
}

const proxy = {
    'GET /api/real/currentUser': {
      $desc: "Description",
      $params: {
        pageSize: {
          desc: 'Page',
          exp: 2,
        },
      },
      $body: {
        name: 'Daniel Garcia',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        notifyCount: 3,
      },
    },

    'GET /api/users': [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }],
    'GET /api/stores': {
      list: [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }]
    },
    'GET /api/project/notice': getNotice,
    'POST /api/district': {
      $params: {},
      $body: getDistricts
    },

    'POST /api/heatmap': {
      $params: {},
      $body: data
    }

  }
;


export default noProxy ? {} : delay(proxy, 100);
