package com.ragtag.boardhub.domain;

import lombok.Data;

@Data
public class BlogNaver {

    private Long blog_id;
    private String title;
    private String link;
    private String description;
    private String image_url;

}
