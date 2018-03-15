export const getNotices = (req, res) => {
  res.json([

    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '2 new stores added',
      datetime: '2017-08-09',
      type: 'Alerts',
    },

    {
      id: '000000009',
      title: 'Unexpected store',
      description: 'Review Store 1234',
      extra: 'Review',
      status: 'todo',
      type: 'Alerts',
    },
    {
      id: '000000010',
      title: 'Small cell warning',
      description: 'blah',
      extra: 'Warning',
      status: 'urgent',
      type: 'Alerts',
    },

  ]);
};
export default {
  getNotices,
};
