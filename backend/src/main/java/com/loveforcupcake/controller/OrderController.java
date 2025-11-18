package com.loveforcupcake.controller;

import com.loveforcupcake.dto.OrderRequest;
import com.loveforcupcake.dto.OrderResponse;
import com.loveforcupcake.service.OrderService;
import com.loveforcupcake.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @Valid @RequestBody OrderRequest request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Long userId = userService.getUserIdByEmail(email);
            OrderResponse response = orderService.createOrder(userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrdersByUserId(
            @RequestParam(required = false) Long userId,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Long authenticatedUserId = userService.getUserIdByEmail(email);
            
            // Se userId não foi fornecido ou é diferente do autenticado, usar o autenticado
            if (userId == null || !authenticatedUserId.equals(userId)) {
                userId = authenticatedUserId;
            }
            
            List<OrderResponse> orders = orderService.getOrdersByUserId(userId);
            return ResponseEntity.ok(orders);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}

