import { delay } from 'roadhog-api-doc';
import { mock } from 'mockjs';

const proxy = {
  'POST /api/login': function(req, res) {
    // console.log(req);
    // res.status = 500;
    // console.log(Object.keys(res));

    res.status(500);
    res.json({ success: false });
  },
};

export default delay(proxy, 1000);
