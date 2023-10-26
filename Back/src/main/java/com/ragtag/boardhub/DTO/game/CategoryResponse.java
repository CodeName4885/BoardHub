package com.ragtag.boardhub.dto.game;

import com.ragtag.boardhub.domain.game.Categories;
import lombok.Data;

@Data
public class CategoryResponse {

    private Long category_id;
    private String category;
    private String translate;

    public CategoryResponse(Categories cate) {
        this.category_id = cate.getCategory_id();
        this.category = cate.getCategory();
        this.translate = cate.getTranslate();
    }

}
