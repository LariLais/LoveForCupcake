package com.loveforcupcake.service;

import com.loveforcupcake.dto.ContactRequest;
import com.loveforcupcake.dto.ContactResponse;
import com.loveforcupcake.model.Contact;
import com.loveforcupcake.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;

    @Transactional
    public ContactResponse createContact(ContactRequest request) {
        Contact contact = new Contact();
        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setMessage(request.getMessage());

        Contact saved = contactRepository.save(contact);
        return toResponse(saved);
    }

    private ContactResponse toResponse(Contact contact) {
        return new ContactResponse(
                contact.getId(),
                contact.getName(),
                contact.getEmail(),
                contact.getMessage(),
                contact.getCreatedAt()
        );
    }
}

