/**
 * We start from here
 * Jadi file ini memuat kode untuk membuat, konfigur.
 * dan menjalankan server HTTP menggunakan Hapi.
 */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5004,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    /**
     * Buat menghandle same origin policy
     * nanti baca lagi itu apa
     * handle ini secara global jika dilakukan di file server
     * bisa juga dilakukan secara lokal di routes
     */
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
};

init();
