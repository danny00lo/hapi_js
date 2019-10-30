// app.js

const Hapi = require('hapi');
require('env2')('./.env');
const config = require('./config');
const routesHelloHapi = require('./routes/hello-hapi');
const routesShop = require('./routes/shop');
const routesOrder = require('./routes/order');
// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');

const server = new Hapi.Server();
// 配置服务器启动host与端口
server.connection({
  port: config.PORT,
  host: config.HOST,
});

const init = async () => {
  await server.register([
    // 为系统使用 hapi-swagger hapi-pagination
    ...pluginHapiSwagger, pluginHapiPagination,
  ]);
  server.route([
    // 创建一个简单的hello hapi接口
    ...routesHelloHapi, ...routesShop, ...routesOrder
  ]);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();