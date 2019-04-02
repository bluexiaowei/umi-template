import request from 'Utils/request';
const services = {};

services.login = function(body) {
  return request({ method: 'post', url: '/login', body });
};

export default services;
