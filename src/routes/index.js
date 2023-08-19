const { Router } = require('express');
const router = Router();
const PokemonsRoute = require('./PokemonsRoute');
const TypesRoute = require('./TypesRoute');
const DocRoute = require('./DocRoute')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', PokemonsRoute)
router.use('/types', TypesRoute)
router.use('/doctors', DocRoute)


module.exports = router;
