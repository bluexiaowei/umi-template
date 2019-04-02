import { delay } from 'roadhog-api-doc';

const proxy = {
  'POST /login': function(req, res) {
    const { account, password } = req.body;
    if (account !== 'admin' || password !== 'admin') {
      res.json({ success: false, message: '用户名密码错误 \n A:admin P: admin' });
    } else {
      res.json({ success: true });
    }
  },
};

export default delay(proxy, 1000);
