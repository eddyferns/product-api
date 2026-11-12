import express from 'express';
import productRoutes from './routes/productRoutes.js'
import pool from './config/db.js';

const app = express();
const PORT = 8040;

//middleware
app.use(express.json());

//ROUTES
// app.use ('/', (req, res) => {
//    res.send("Hello World")
// });
// app.use('/', productRoutes);
app.use('/product', productRoutes);


app.listen(PORT, async() => {
   try {
      const connection = await pool.getConnection();
      connection.release();       //Release the connection back if successful
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Database Connection Established`);

   } catch (error) {
      console.error(`Failed to connect to Database: ${error.message}`);
      console.log(`Server is running without Database Connection `);
      
   }


})