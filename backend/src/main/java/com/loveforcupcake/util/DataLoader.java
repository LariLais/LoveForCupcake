package com.loveforcupcake.util;

import com.loveforcupcake.model.Product;
import com.loveforcupcake.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Product> seeds = new ArrayList<>();

        seeds.add(new Product(
            null,
            "Cupcake Classic",
            "Cupcake de baunilha com cobertura de buttercream",
            new BigDecimal("5.50"),
            50,
            "/img/cupcake-vanilla.svg",
            null,
            null
        ));

        seeds.add(new Product(
            null,
            "Cupcake Chocolate",
            "Cupcake de chocolate com ganache",
            new BigDecimal("6.00"),
            30,
            "/img/cupcake-choco.svg",
            null,
            null
        ));

        seeds.add(new Product(
            null,
            "Red Velvet Cupcake",
            "Cupcake red velvet com cobertura de cream cheese",
            new BigDecimal("6.50"),
            25,
            "/img/cupcake-redvelvet.svg",
            null,
            null
        ));

        // Upsert each seed: update if a product with same name exists, otherwise create
        List<Product> existing = productRepository.findAll();
        for (Product seed : seeds) {
            Product match = existing.stream()
                .filter(p -> p.getName() != null && p.getName().equals(seed.getName()))
                .findFirst()
                .orElse(null);

            if (match != null) {
            match.setDescription(seed.getDescription());
            match.setPrice(seed.getPrice());
            match.setStock(seed.getStock());
            match.setImageUrl(seed.getImageUrl());
            productRepository.save(match);
            } else {
            productRepository.save(seed);
            }
        }
    }
}
