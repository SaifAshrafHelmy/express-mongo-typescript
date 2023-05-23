import express from 'express';
import controllers from '../controllers/Book';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), controllers.createBook);
router.get('/get/:bookId', controllers.readBook);
router.get('/get', controllers.readAll);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.create), controllers.UpdateBook);
router.delete('/delete/:bookId', controllers.DeleteBook);

export default router;
