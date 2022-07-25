/* eslint-disable max-len */
/**
 * Memuat seluruh fungsi-fungsi handler yang digunakan.
 */

const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  /**
   * untuk mendapatkan body request di Hapi
   * adalah dengan properti request.payload
   */
  const {title, tags, body} = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  // eslint-disable-next-line spaced-comment
  //gunakan cara di bawah ini untuk check id sudah ada isi atau belum.
  const isSuccess = notes.filter((note)=> note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response(
        {
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId: id,
          },
        },
    );
    response.code(201);
    return response;
  }

  /**
   * Jika isSuccess true lines di bawah
   * tidak akan tereksekusi
   */
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  /**
     * untuk mendaptkan id ketika salah satu list diclick;
     */
  const {id} = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response(
      {
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      },
  );
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const {id} = request.params;

  /**
     * Kita perlu mengupdate apa
     * title, tag, dan body saja
     */
  const {title, tags, body} = request.payload;
  /**
     * Tanggal update juga perlu
     * jadi nilainya kita ganti ke yang terbaru
     */
  const updatedAt = new Date().toISOString();

  /**
     * untuk data yang mau diganti sudah lengkap
     * saatnya kita ubah dengan indexing array
     */
  const index = notes.findIndex((note) => note.id === id);

  /**
   * Kita cek dan jalankan if condition jika
   * index ada isinya
   */
  if (index !== -1) {
    notes[index] = {
      /**
       * Spread operator di bawah berguna untuk mempertahankan nilai
       * note[index] yang tidak perlu diubah
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
       * kurang ngerti sih dah dari dulu
       */
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const {id} = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response(
        {
          status: 'success',
          message: 'Catatan berhasil dihapus',
        },
    );

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

/**
 * Kemudian exports handler route ini
 * ke routes,
 */
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler};
