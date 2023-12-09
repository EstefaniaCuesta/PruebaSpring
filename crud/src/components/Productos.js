import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Navegacion } from "./Navegacion";

const Productos = () => {

    const [product, setProduct] = useState([]);
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [editProducto, setEditProducto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [id, setAddProductId] = useState('');

    useEffect(() => {
        getProductos();
    }, []);


    const abrirFormularioAgregar = () => {
        setShowAddModal(true);
    };

    const cerrarFormularioAgregar = () => {
        setShowAddModal(false);
    };

    const agregarProducto = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/products", {
                id: id,
                nombreProducto,
                precioProducto

            });
            console.log(response.data.message);
            cerrarFormularioAgregar();
            getProductos(); // Recargar la lista después de la adición.
        } catch (error) {
            console.error("Error al agregar productos:", error);
        }
    };

    const abrirFormularioEdicion = (product) => {
        setEditProducto(product);
        setNombreProducto(product.nombreProducto);
        setPrecioProducto(product.precioProducto);
        setShowModal(true);
    };

    const cerrarFormularioEdicion = () => {
        setEditProducto(null);
        setNombreProducto('');
        setPrecioProducto('');
        setShowModal(false);
    };

    const getProductos = async () => {
        const result = await axios.get('http://localhost:8080/api/v1/products');
        setProduct(result.data);
    }

    const eliminarProducto= async (id) => {
            try {
                if (!editProducto) {
                    console.error("No hay producto para editar.");
                    return;
                }
        
                console.log("ID del producto a editar:", editProducto.id);

            const response = await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
            console.log(response.data.message);
            getProductos();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    const editarProducto = async () => {
        try {
            if (!editProducto) {
                console.error("No hay producto para editar.");
                return;
            }
    
            // Añade console.log para verificar los valores antes de la solicitud PUT
            console.log("Nombre antes de la edición:", nombreProducto);
            console.log("Precio antes de la edición:", precioProducto);
    
            const url = `http://localhost:8080/api/v1/products/${editProducto.id}/update`;
            console.log("La siguiente URL se emplea:", url);
    
            const response = await axios.put(url, {
                nombreProducto: nombreProducto,
                precioProducto: precioProducto
            });
    
            console.log(response.data.message);
            cerrarFormularioEdicion();
            getProductos(); // Recargar la lista después de la edición.
        } catch (error) {
            console.error("Error al editar Producto:", error);
        }
    };
    
    
    

    return (
        <div>
            <Navegacion/>

            <div className="position-absolute top-50 start-50 translate-middle">
                <div>
                    <h2 className="d-flex justify-content-center  col-4 mb-2" >Producto</h2>
                </div>

                <table className="table w-100">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {product.map((product) => (
                        <tr key={product.id}>
                            <td>{product.nombreProducto}</td>
                            <td>{product.precioProducto}</td>
                            <td>
                                    <button className="btn btn-success mx-2" onClick={() => abrirFormularioEdicion(product)}>
                                    <FaEdit />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => eliminarProducto(product.id)}>
                                    <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className=" btn btn-success float-end " onClick={abrirFormularioAgregar}> Agregar Producto <FaPlus /> </button>
                {/* Modal de edición */}
                <Modal show={showModal} onHide={cerrarFormularioEdicion}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label  className="col-6 mb-2">Nombre:</label>
                        <input type="text"  className="col-6 mb-2" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />

                        <label className="col-6 mb-2">Precio:</label>
                        <input type="text" className="col-6 mb-2" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} />

                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={editarProducto}>
                            Guardar
                        </Button>
                        <Button variant="secondary" onClick={cerrarFormularioEdicion}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal de adición */}

                <Modal show={showAddModal} onHide={cerrarFormularioAgregar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="col-6 mb-2">Nombre:</label>
                        <input className="col-6 mb-2" type="text" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />

                        <label className="col-6 mb-2">Precio:</label>
                        <input className="col-6 mb-2" type="text" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={agregarProducto}>
                            Agregar
                        </Button>
                        <Button variant="secondary" onClick={cerrarFormularioAgregar}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showAddModal} onHide={cerrarFormularioAgregar}>
    <Modal.Header closeButton>
        {/* Título del modal */}
        <Modal.Title>Agregar Producto</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {/* Campo de entrada para el nombre del nuevo producto */}
        <label className="col-6 mb-2">Nombre:</label>
        <input className="col-6 mb-2" type="text" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />

        {/* Campo de entrada para el precio del nuevo producto */}
        <label className="col-6 mb-2">Precio:</label>
        <input className="col-6 mb-2" type="text" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} />
    </Modal.Body>
    <Modal.Footer>
        {/* Botón para agregar el nuevo producto */}
        <Button variant="success" onClick={agregarProducto}>
            Agregar
        </Button>
        {/* Botón para cancelar la operación de agregar */}
        <Button variant="secondary" onClick={cerrarFormularioAgregar}>
            Cancelar
        </Button>
    </Modal.Footer>
</Modal>

            </div>
        </div>
    );
}

export default Productos;

