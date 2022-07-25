/**
 * konfigur, routing server endpoint dan kawan kawan diatur di sini.
 * path, method dan handler.
 */
const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    /**
     * Kita sudah tidak perlu lagi untuk
     * bikin function handler yang panjang
     * karena sudah dihandle, di file js terpisah
     * kasus ini handler.js
     */
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

/**
 * Export kemudian ke server.js untuk mengaktifkan rute
 */
module.exports = routes;
