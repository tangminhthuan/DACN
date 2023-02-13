package com.ecommerce.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "sizes")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Size extends BaseEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private String name;
    @OneToMany(mappedBy = "size")
    private Set<ProductMapSize> productMapSizes;
}
