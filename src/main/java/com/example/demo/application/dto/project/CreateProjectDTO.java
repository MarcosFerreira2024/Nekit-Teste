package com.example.demo.application.dto.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateProjectDTO (

   @NotBlank
   @Size(min = 1, max = 60,message = "Title must be at a 1-60 character range")
   String title,

   @Size(min = 1, max = 60, message = "Description must be at a 1-60 character range")
   String description

){}
