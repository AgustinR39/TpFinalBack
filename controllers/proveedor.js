const connection= require ("../connectDB/dBconnection")

function getAllProveedores(req,res){
    const query = "SELECT * FROM proveedor";

    connection.query(query,(err,result)=>{
        if (err){
            console.error(err)
            res.status(500).send("Error retrieving notes from database")
        } else {
            res.json(result)
        }
    });
}

function createProveedor(req,res) {
    const { nombre, cuit} = req.body;
    const query = "INSERT INTO proveedor (nombre, cuit) VALUES (?, ?)";

    connection.query(query, [ nombre, cuit], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500).send("Error, no se pudo insertar el proveedor")
        } else{
            res.status(201).json(result); 
        }
    });
}

function updateProveedor(req,res) {
    const {id}= req.params;
    const {nombre, cuit} = req.body;
    const query = "UPDATE proveedor SET nombre=?, cuit=? WHERE id=?";

    connection.query(query, [nombre, cuit, id], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500).send("Error, couldn't insert notes")
        } else{
            res.json(result)
        }
    });
}

function getProveedorById(req,res) {
    const proveedorId = req.params.id

    const query= "SELECT * FROM proveedor WHERE id = ?";

    connection.query(query, [proveedorId], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500),send("Error retrieving note from database")
        }else{
            res.json(result)
        }
    });
}

function deleteProveedor(req,res) {
    const proveedorId= req.params.id

    const query= "DELETE FROM proveedor WHERE id=?";

    connection.query(query, [proveedorId], (err, result) => {
        if(err){
            console.error(err)
            res.status(500).send("Error deleting notes from database")
        }else {
            res.json(result)
        }
    });
}

module.exports ={
    getAllProveedores,
    createProveedor,
    updateProveedor,
    getProveedorById,
    deleteProveedor
}