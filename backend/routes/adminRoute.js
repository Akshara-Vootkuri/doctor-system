
import express from 'express';
import { addDoctor,allDoctors,loginAdmin } from '../controllers/adminController.js'; // ✅ Add .js extension
import upload from '../middleware/multer.js'; // ✅ Add .js extension
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

// adminRouter.post('/add-doctor', upload.single('image'), addDoctor);
adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin,allDoctors);
adminRouter.post('/change-availability', authAdmin,changeAvailability);


export default adminRouter;
