const { Router } = require('express');
const {Turnos, Paciente, Doctor} = require('../db')
const router = Router();

router.get('/', async (req,res)=>{
    try {
        const turnos = await Turnos.findAll({
            include: [{ model: Paciente },{model: Doctor}],
          })
        res.status(200).send(turnos)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

router.post('/:id', async (req, res) => {
    try {
        const pacienteId = req.params.id;

        if(!pacienteId){
            return res.status(404).send("Paciente no encontrado");
        }
        const { fecha, hora, doctorId } = req.body; // Agrega 'doctorId' al cuerpo

        const turno = await Turnos.create({
            fecha,
            hora,
            pacienteId,
            doctorId, // Asocia el doctor al turno creado
        });

        const paciente = await Paciente.findByPk(pacienteId);

        if (!paciente) {
            return res.status(404).send("Paciente no encontrado");
        }

        const doctor = await Doctor.findByPk(doctorId);

        if (!doctor) {
            return res.status(404).send("Doctor no encontrado");
        }

        const turnoConInfo = {
            id: turno.id,
            fecha: turno.fecha,
            hora: turno.hora,
            pacienteId: turno.pacienteId,
            doctorId: turno.doctorId, // Agrega el ID del doctor al objeto de respuesta
            paciente: {
                id: paciente.id,
                name: paciente.name,
                lastname: paciente.lastname,
                cel: paciente.cel,
                insurance: paciente.insurance
            },
            doctor: { // Agrega el objeto de información del doctor
                id: doctor.id,
                name: doctor.name,
                lastname: doctor.lastname,
                speciality: doctor.speciality
            }
        };

        res.status(201).json(turnoConInfo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
});

router.get('/:id', async(req,res)=>{
    try {
        const id = req.params.id
        
    const turno = await Turnos.findByPk(id,{
        include: [{ model: Paciente },{model: Doctor}],
    })
    if(!turno){
        return res.status(404).send("Turno no encontrado")
    }
    res.status(200).send(turno)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
    
    
})

router.delete('/:id', async(req,res)=>{
    try {
        const id = req.params.id
        const deletedTurno = await Turnos.destroy({
            where: {
                id
            }
        })
        if(!deletedTurno){
            return res.status(404).send("Turno no encontrado")
        }

        res.status(200).send("Turno eliminado")
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

router.put('/:id', async(req,res)=>{
    try {
        const id = req.params.id
        const {fecha, hora, doctorId} = req.body
        const updatedTurno = await Turnos.update({
            fecha,
            hora,
            doctorId
        },{
            where:{
                id
            }
        })
        if(!updatedTurno){
            return res.status(404).send("Turno no encontrado")
        }
        res.status(200).send(updatedTurno)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})




module.exports = router