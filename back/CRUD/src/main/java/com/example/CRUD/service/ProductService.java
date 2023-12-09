package com.example.CRUD.service;

import com.example.CRUD.product.Product;
import com.example.CRUD.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    HashMap<String, Object> datos;
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;

    }
    @GetMapping
    public List<Product> getProducts() {
        return this.productRepository.findAll();
    }


    public ResponseEntity<Object> newProduct(Product product) {
        Optional<Product> res = productRepository.findByNombreProducto(product.getNombreProducto());
        datos = new HashMap<>();


        if(res.isPresent() && product.getId()==null){
            datos.put("error", true);
            datos.put("message", "Ya existe un producto con ese nombre");
            return new ResponseEntity<>(
                    datos,
                    HttpStatus.CONFLICT
            );
        }datos.put("message", "se ha guardado correctamente");

        if(product.getId()!=null){

            datos.put("message", "se actualizó correctamente");
        }
        productRepository.save(product);
        datos.put("datos", product);
        return new ResponseEntity<>(
                datos,
                HttpStatus.CREATED
        );
    }

    public ResponseEntity<Object> deleteproduct(Long id){
        datos = new HashMap<>();
        boolean existe = this.productRepository.existsById(id);
        if(!existe){
            datos.put("error", true);
            datos.put("message", "No existe un producto con ese id");
            return new ResponseEntity<>(
                    datos,
                    HttpStatus.CONFLICT
            );
        }
        datos.put("data", true);
        datos.put("message", "producto eliminado");
        return new ResponseEntity<>(
                datos,
                HttpStatus.ACCEPTED
        );

    }
}
