package com.ecommerce.Controller;

import com.ecommerce.Application.Abstractions.IBrandService;
import com.ecommerce.Application.PreAuthorizes.StaffRole;
import com.ecommerce.Entities.BaseEntity;
import com.ecommerce.Entities.Brand;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000/","http://localhost:4000/"})
public class BrandController {
    @Autowired
    IBrandService brandService;

    @GetMapping("/all")
    public ResponseEntity<List<Brand>> getAllBrands() {
        try {
            List<Brand> brands = brandService.findAll();
            return ResponseEntity.ok(brands);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all/active")
    @StaffRole
    public ResponseEntity<List<Brand>> getAllActiveBrands() {
        try {
            List<Brand> brands = brandService.findAllByIsDeletedFalse();
            return ResponseEntity.ok(brands);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
