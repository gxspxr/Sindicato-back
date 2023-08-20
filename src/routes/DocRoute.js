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
    const {name, lastname} = req.body;
  
      const doctor = await Doctor.create({
      name,
      lastname
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
      const deletedDoctor = await Doctor.destroy({
        where: {
          id: id
        }
      });
      if (deletedDoctor === 0) {
        return res.status(404).send("Error al encontrar el doctor");
      }
      return res.status(200).send(`El doctor ${id} se eliminó con éxito`);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("internal server error");
    }
  });
  
module.exports=router;