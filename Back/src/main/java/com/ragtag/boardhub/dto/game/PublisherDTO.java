package com.ragtag.boardhub.DTO.game;

import com.ragtag.boardhub.domain.game.Publishers;
import lombok.Data;

@Data
public class PublisherDTO {

    private Long publisherId;
    private String publisher;
    private String translate;


    public PublisherDTO(Publishers pub) {
        this.publisherId = pub.getPublisher_id();
        this.publisher = pub.getPublisher();
        this.translate = pub.getTranslate();
    }

}
