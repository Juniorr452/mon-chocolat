import { createServer, Factory, Model } from 'miragejs';

export function makeServer({environment = "test"}) {
  return createServer({
    environment,

    factories: {
      product: Factory.extend({
        name(i) {
          return `Chocolat ${i + 1}`
        },

        price() {
          return 49.99
        },

        availableQuantity(i) {
          const quantity = [
            5, 11, 18, 27, 6, 0, 9
          ]

          return quantity[i % quantity.length]
        }
      }),
    },

    models: {
      product: Model,
    },

    routes() {
      // Development mode fix
      this.passthrough('/_next/static/development/_devPagesManifest.json');

      this.namespace = 'api';
  
      this.get('/products');
    },

    seeds(server) {
      server.createList("product", 11);
    }
  })
}

