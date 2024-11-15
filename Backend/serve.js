require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

const vigilanteRoute= require('./routes/vigilanteRoute');
const estudianteRoute= require('./routes/estudianteRoute')
const userRoutes= require('./routes/userRoutes');
const authRoute= require('./routes/authRoute')
const adminRoute= require('./routes/adminRoute')
const objetoRoute= require('./routes/objetoRoute')
const puntoRoute = require('./routes/puntoRoute')
const registroRoute= require('./routes/registroRoute')


const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use('/auth',authRoute);

app.use('/vigilantes' ,vigilanteRoute);
app.use('/estudiantes',estudianteRoute);
app.use('/user',userRoutes);
app.use('/admin', adminRoute);
app.use('/objeto', objetoRoute);
app.use('/control', puntoRoute);
app.use('/registros', registroRoute)

// Rutas protegidas
app.get('/protected', authMiddleware(['Estudiante','Vigilante']), (req, res) => {
    res.json({ message: "Ruta protegida", userId: req.userId, role: req.userRole });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));