package com.example.demo.domain.exceptions;

public class ResourceNotFoundException extends DomainException{


    public ResourceNotFoundException(String resource, Object value){
        super("Resource : %s , with value %s not found".formatted(resource,value));

    }
}
