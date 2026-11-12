import pool from '../config/db.js';

export const getAllProducts = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM product');
        res.json(rows);
        
    } catch (err) {
        res.status(500).json({ error: err.message })        
    }
};

export const getProductById = async(req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM product WHERE id = ?', [req.params.id]);
        if(rows.length === 0){
            return res.status(404).json({error: 'Product Not Found'});
        }
        res.json(rows[0])
        
    } catch (err) {
        res.status(500).json({ error: err.message })        
    }
};

// Create a Product
export const createProduct = async(req, res) => {
    try {
        const {name, price, description} = req.body;

        if(!price || price <= 0) {
            return res.status(400).json({error: 'Valid price is required'})
        }

        const [result] = await pool.query(
            'INSERT INTO product(name, price, description) VALUES(?, ?, ?)',
            [name, price, description]
        );

        res.status(201).json({id: result.insertID, name, price, description});       
        
    } catch (err) {
        res.status(500).json({ error: err.message });   
    }
 };

// Update a Product
export const updateProduct = async(req, res) => {
    try {
        const {name, price, description} = req.body;

        if(price && price <= 0) {
            return res.status(400).json({error: 'Valid price is required'})
        }

        const [result] = await pool.query(
            'UPDATE product SET name = ?, price = ?, description = ? WHERE id = ?',
            [name, price, description, req.params,id]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({error: 'Product Not Found'});
        }

        res.status(200).json({message: 'Product Updated Successfully'});       
        
    } catch (err) {
        res.status(500).json({ error: err.message });   
    }
 };

// Delete a Product
export const deleteProduct = async(req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM product WHERE id = ?, [req.params.id]')

        if(result.affectedRows === 0){
            return res.status(404).json({error: 'Product Not Found'});
        }
        
        res.sendStatus(204);
        
    } catch (err) {
        res.status(500).json({ error: err.message });   
    }
 };