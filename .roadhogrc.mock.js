import mockjs from 'mockjs';
import {getRule, postRule} from './mock/rule';
import {getActivities, getNotice, getFakeList} from './mock/api';
import {getDistricts} from './mock/districts';
import {format, delay} from 'roadhog-api-doc';

const noProxy = process.env.NO_PROXY === 'true';

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
    'GET /api/project/notice': getNotice,
    'POST /api/district': {
      $params: {},
      $body: getDistricts
    }
  }
;


export default noProxy ? {} : delay(proxy, 100);
