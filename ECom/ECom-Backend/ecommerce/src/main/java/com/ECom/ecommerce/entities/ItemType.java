package com.ECom.ecommerce.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemType {
    
    @Id
    private Long itemTypeId;

    @Column(length = 100, nullable = false)
    private String itemTypeName;

    @OneToMany(mappedBy = "itemType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products = new ArrayList<>();
}
