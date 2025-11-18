package com.loveforcupcake.controller;

import com.loveforcupcake.dto.ContactRequest;
import com.loveforcupcake.dto.ContactResponse;
import com.loveforcupcake.service.ContactService;
import jakarta.validation.Valid;
// lombok.RequiredArgsConstructor removed; explicit constructor provided
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> createContact(@Valid @RequestBody ContactRequest request) {
        try {
            ContactResponse response = contactService.createContact(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}

