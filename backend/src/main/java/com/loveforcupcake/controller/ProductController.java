package com.loveforcupcake.controller;

import com.loveforcupcake.dto.ProductResponse;
import com.loveforcupcake.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(
            @RequestParam(required = false) Long id) {
        if (id != null) {
            try {
                ProductResponse product = productService.getProductById(id);
                return ResponseEntity.ok(List.of(product));
            } catch (RuntimeException e) {
                return ResponseEntity.notFound().build();
            }
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }
}

