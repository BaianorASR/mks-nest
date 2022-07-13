import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('MKS Movies')
  .setDescription('The movies API description')
  .setVersion('1.0')
  .addTag('movies')
  .addTag('categories')
  .addTag('directors')
  .addTag('actors')
  .build();

const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};

export { config, options };
