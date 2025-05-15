import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Linong 点餐系统 API',
      version: '1.0.0',
      description: '菜单、分类、订单的 CRUD 接口文档和测试',
    },
    servers: [
      { url: 'http://localhost:5000/api', description: '本地开发服务器' },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // 扫描你的路由文件，读取注释
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
