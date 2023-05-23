import express from 'express';
import controllers from '../controllers/Book';

const router = express.Router();

router.post('/create', controllers.createBook);
router.get('/get/:bookId', controllers.readBook);
router.get('/get', controllers.readAll);
router.patch('/update/:bookId', controllers.UpdateBook);
router.delete('/delete/:bookId', controllers.DeleteBook);

export default router;
