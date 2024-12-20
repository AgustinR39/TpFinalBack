const connection= require ("../connectDB/dBconnection")

function getAllClientes(req,res){
    const query = "SELECT * from cliente"

    connection.query(query,(err,result)=>{
        if (err){
            console.error(err)
            res.status(500).send("Error retrieving notes from database")
        } else {
            res.json(result)
        }
    });
}

function createCliente(req,res) {
    const { nombre, cuit} = req.body
    const query = "INSERT INTO cliente ( nombre, cuit) VALUES (?,?)"

    connection.query(query, [nombre, cuit], (err,result)=>{
        if (err) {
            console.error('Error al insertar el cliente:', err);
            return res.status(500).send("Error, no se pudo insertar el cliente");
        }
        res.json(result);
    });
}

function updateCliente(req,res) {
    const {id}= req.params;
    const {nombre, cuit} = req.body;
    const query = "UPDATE cliente SET nombre=?, cuit=? WHERE id=?";

    connection.query(query, [ nombre, cuit, id], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500).send("Error, couldn't insert notes")
        } else{
            res.json(result)
        }
    });
}

function getClienteById(req,res) {
    const clienteId = req.params.id

    const query= "SELECT * FROM cliente WHERE id = ?";

    connection.query(query, [clienteId], (err,result)=>{
        if (err) {
            console.error('Error al obtener el cliente por id:', err);
            return res.status(500).send("Error al recuperar el cliente desde la base de datos");
        }
        res.json(result);
    });
}

function deleteCliente(req,res) {
    const clienteId= req.params.id

    const query= "DELETE FROM cliente WHERE id=?"

    connection.query(query, [clienteId], (err, result) => {
        if(err){
            console.error(err)
            res.status(500).send("Error deleting notes from database")
        }else {
            res.json(result)
        }
    });
}

module.exports ={
    getAllClientes,
    createCliente,
    updateCliente,
    getClienteById,
    deleteCliente
}