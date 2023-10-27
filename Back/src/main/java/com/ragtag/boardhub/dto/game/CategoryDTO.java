package com.ragtag.boardhub.dto.game;

import com.ragtag.boardhub.domain.game.Categories;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    private Long categoryId;
    private String category;
    private String translate;

    public CategoryDTO(Categories cate) {
        this.categoryId = cate.getCategory_id();
        this.category = cate.getCategory();
        this.translate = cate.getTranslate();
    }

    public Categories toEntity() {
        Categories category = new Categories();
        category.setCategory_id(this.categoryId);
        category.setCategory(this.category);
        category.setTranslate(this.translate);
        return category;
    }

}
