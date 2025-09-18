package com.ECom.ecommerce.entities;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    
    @Id 
    private Long cartItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private int quantity;

    private String productName(){
        return product.getName();
    }

    private BigDecimal getProductPrice(){
        return product.getPrice();
    }

    private BigDecimal getTotalPrice(){
        BigDecimal productPrice = getProductPrice();
        return productPrice.multiply(BigDecimal.valueOf(quantity));
    }
    

}
