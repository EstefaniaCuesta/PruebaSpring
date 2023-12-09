import axios from 'axios';

const getProducts = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/products');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};