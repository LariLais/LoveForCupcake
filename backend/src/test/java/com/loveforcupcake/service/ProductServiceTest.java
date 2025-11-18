package com.loveforcupcake.service;

import com.loveforcupcake.dto.ProductRequest;
import com.loveforcupcake.model.Product;
import com.loveforcupcake.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void getAllProducts_mapsToResponse() {
        Product p = new Product();
        p.setId(1L);
        p.setName("Cupcake");
        p.setDescription("Delicious");
        p.setPrice(new BigDecimal("5.50"));
        p.setStock(10);
        p.setImageUrl("/img/cupcake.png");
        p.setCreatedAt(LocalDateTime.now());
        p.setUpdatedAt(LocalDateTime.now());

        when(productRepository.findAll()).thenReturn(List.of(p));

        var responses = productService.getAllProducts();

        assertNotNull(responses);
        assertEquals(1, responses.size());
        var r = responses.get(0);
        assertEquals(p.getId(), r.getId());
        assertEquals("Cupcake", r.getName());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void getProductById_notFound_throws() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> productService.getProductById(99L));
        verify(productRepository).findById(99L);
    }

    @Test
    void createProduct_savesAndReturns() {
        ProductRequest req = new ProductRequest();
        req.setName("Cookie");
        req.setDescription("Tasty");
        req.setPrice(new BigDecimal("3.00"));
        req.setStock(5);
        req.setImageUrl("/img/cookie.png");

        Product saved = new Product();
        saved.setId(2L);
        saved.setName(req.getName());
        saved.setDescription(req.getDescription());
        saved.setPrice(req.getPrice());
        saved.setStock(req.getStock());
        saved.setImageUrl(req.getImageUrl());

        when(productRepository.save(any(Product.class))).thenReturn(saved);

        var resp = productService.createProduct(req);

        assertNotNull(resp);
        assertEquals(2L, resp.getId());
        assertEquals("Cookie", resp.getName());
        verify(productRepository).save(any(Product.class));
    }
}
