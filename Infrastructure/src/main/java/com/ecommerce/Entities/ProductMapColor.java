package com.ecommerce.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "product_map_color")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductMapColor implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid-gen")
    private UUID id;
    @GeneratedValue(generator = "uuid-gen")
    @Getter
    @Setter
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @GeneratedValue(generator = "uuid-gen")
    @Getter
    @Setter
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "color_id", nullable = false)
    private Color color;
}
