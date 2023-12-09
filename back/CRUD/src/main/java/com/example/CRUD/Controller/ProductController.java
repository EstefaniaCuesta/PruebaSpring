package com.example.CRUD.Controller;

import com.example.CRUD.product.Product;
import com.example.CRUD.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/products")
public class ProductController {
    private final ProductService productService;
    @Autowired

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
        @GetMapping
        public List<Product> getProducts(){
            return productService.getProducts();

    }

        @PostMapping
        public ResponseEntity<Object> registrarProducto(@RequestBody Product product){
            return this.productService.newProduct(product);
        }

        @PutMapping
        public ResponseEntity<Object> ActualizarProducto(@RequestBody Product product){
            return this.productService.newProduct(product);
    }

        @DeleteMapping(path = "{productId}")
    public ResponseEntity<Object> EliminarProducto(@PathVariable("productId") Long id){
        return  this.productService.deleteproduct(id);
        }

}
