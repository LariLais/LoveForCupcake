package com.loveforcupcake.controller;

import com.loveforcupcake.dto.OrderStatusUpdateRequest;
import com.loveforcupcake.dto.ProductRequest;
import com.loveforcupcake.dto.ProductResponse;
import com.loveforcupcake.model.Order;
import com.loveforcupcake.service.OrderService;
import com.loveforcupcake.service.ProductService;
import jakarta.validation.Valid;
// lombok.RequiredArgsConstructor removed; explicit constructor provided
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ProductService productService;
    private final OrderService orderService;

    public AdminController(ProductService productService, OrderService orderService) {
        this.productService = productService;
        this.orderService = orderService;
    }

    // Product Management
    @PostMapping("/products")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        try {
            ProductResponse response = productService.createProduct(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/products")
    public ResponseEntity<ProductResponse> updateProduct(
            @RequestParam Long id,
            @Valid @RequestBody ProductRequest request) {
        try {
            ProductResponse response = productService.updateProduct(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/products")
    public ResponseEntity<Void> deleteProduct(@RequestParam Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Order Management
    @PutMapping("/orders/status")
    public ResponseEntity<com.loveforcupcake.dto.OrderResponse> updateOrderStatus(
            @RequestParam Long id,
            @Valid @RequestBody OrderStatusUpdateRequest request) {
        try {
            Order.OrderStatus status = Order.OrderStatus.valueOf(request.getStatus().toUpperCase());
            com.loveforcupcake.dto.OrderResponse response = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

