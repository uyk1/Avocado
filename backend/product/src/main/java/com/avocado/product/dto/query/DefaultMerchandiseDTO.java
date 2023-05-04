package com.avocado.product.dto.query;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class DefaultMerchandiseDTO {
    private final String brandName;
    private final Long merchandiseId;
    private final String merchandiseCategory;
    private final String imageUrl;
    private final String merchandiseName;
    private final Integer price;
    private final Integer discountedPrice;


    @QueryProjection
    public DefaultMerchandiseDTO(String brandName, Long merchandiseId, String merchandiseCategory, String imageUrl,
                                 String merchandiseName, Integer price, Integer discountedPrice) {
        this.brandName = brandName;
        this.merchandiseId = merchandiseId;
        this.merchandiseCategory = merchandiseCategory;
        this.imageUrl = imageUrl;
        this.merchandiseName = merchandiseName;
        this.price = price;
        this.discountedPrice = discountedPrice;
    }
}
