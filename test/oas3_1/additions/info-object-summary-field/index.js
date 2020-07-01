import SwaggerClient from '../../../../src';

describe('OpenAPI Specification 3.1', () => {
  describe('InfoObject.summary', () => {
    describe('given definition without summary field', () => {
      const spec = require('./data/without-field.json');

      test('should not contain summary field in resolved spec', async () => {
        const client = await new SwaggerClient({ spec });

        expect(client.spec.info.summary).toBeUndefined();
        expect(client.originalSpec.info.summary).toBeUndefined();
      });
    });

    describe('given definition with summary field', () => {
      const spec = require('./data/with-field.json');

      test('should contain summary field in resolved spec', async () => {
        const client = await new SwaggerClient({ spec });

        expect(client.spec.info.summary).toStrictEqual('info object summary');
        expect(client.originalSpec.info.summary).toStrictEqual('info object summary');
      });
    });
  });
});
