const { Router } = require('express');
const {Doctor}=require('../db')
const router = Router(); 


router.get('/', async (req,res)=>{
    try {
        const doctors = await Doctor.findAll()
        res.status(200).send(doctors)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }

})
router.post('/', async (req, res) => {
    try {
    const {name, lastname, speciality} = req.body;
  
      const doctor = await Doctor.create({
      name,
      lastname,
      speciality
      });
  
      if (!doctor) {
        return res.send({ message: "Not created" });
      }

  
      return res.status(201).send(doctor);
    } catch (error) {
      console.error(error.message);
      return res.status(404).send("Error en alguno de los datos enviados");
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const name = req.body.name
      const lastname = req.body.lastname
      const deletedDoctor = await Doctor.destroy({
        where: {
          id: id
        }
      });
      if (deletedDoctor === 0) {
        return res.status(404).send("Error al encontrar el doctor");
      }
      return res.status(200).send(`El doctor ${name + " " + lastname} se eliminó con éxito`);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("internal server error");
    }
  });

  router.put('/:id', async (req, res) => {
     
    try {
      const id = req.params.id;
      const name = req.body.name
      const lastname = req.body.lastname
      const speciality = req.body.speciality
      const updatedDoctor = await Doctor.update({
        name: name,
        lastname: lastname,
        speciality: speciality
      }, {
        where: {
          id: id
        }
      });
      if (updatedDoctor === 0) {
        return res.status(404).send("Error al encontrar el doctor");
      }
      return res.status(200).send(`El doctor ${name + " " + lastname} se actualizó con exito`);
    } catch (error) {
      console.error(error.message);
  }});

  router.get('/:id', async(req,res)=>{
    try {
        const id = req.params.id
        
    const doctor = await Doctor.findByPk(id,{
        include: [{ model: Paciente },{model: Turnos}],
    })
    if(!doctor){
        return res.status(404).send("Doctor no encontrado")
    }
    res.status(200).send(doctor)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
  })
  
module.exports=router;