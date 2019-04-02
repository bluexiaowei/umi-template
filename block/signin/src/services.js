import request from 'Utils/request';
const services = {};

services.login = function(data) {
  return request({ method: 'post', url: '/login', data });
};

export default services;
