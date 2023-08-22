const { Router } = require('express');
const {Paciente}=require('../db')
const router = Router();


router.get('/', async (req,res)=>{
    try {
        const pacientes = await Paciente.findAll()
        res.status(200).send(pacientes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

router.post('/', async (req,res)=>{
    try {
        const {id,name, lastname, cel, insurance} = req.body;
        const paciente = await Paciente.create({
            id,
            name,
            lastname,
            cel,
            insurance
        });
        res.status(201).send(paciente);
}
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
});

router.delete('/:id', async(req,res)=>{
    try {
        const id=req.params.id
    const name = req.body.name
    const lastname = req.body.lastname
    const deletedPatient=await Paciente.destroy({
        where:{
            id:id
        }
    })
    if(deletedPatient===0){
        res.status(404).send("Error al encontrar el paciente")
    }
    res.status(200).send(`El paciente ${name + " " + lastname} se elimino con exito`)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
    
})

router.put('/:id', async(req,res)=>{
    try {
        const id=req.params.id
        const name = req.body.name
        const lastname = req.body.lastname
        const cel = req.body.cel
        const insurance = req.body.insurance
        const updatedPatient=await Paciente.update({
            name:name,
            lastname:lastname,
            cel:cel,
            insurance:insurance
        },{
            where:{
                id:id
        }
        })
        if(updatedPatient===0){
            res.status(404).send("Error al encontrar el paciente")
        }
        res.status(200).send(`El paciente ${name + " " + lastname} se actualizo con exito`)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
        
    }
})

router.get('/:id', async(req,res)=>{
    try {
        const id=req.params.id
        const patient=await Paciente.findByPk(id)
        res.status(200).send(patient)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})



module.exports = router