const { Router } = require('express');
const router = Router();
const DocRoute = require('./DocRoute')
const PatientRoute = require('./PatientRoute')
const AppointmentRoute = require('./AppointmentRoute')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/doctors', DocRoute)
router.use('/patients', PatientRoute)
router.use('/appointments', AppointmentRoute)


module.exports = router;
