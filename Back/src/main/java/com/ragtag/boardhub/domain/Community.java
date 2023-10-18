package com.ragtag.boardhub.domain;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class Community {
    private Long comm_id;
    private String title;
    private String content;
    private Long count;
    private Long type;
    private Long likes;
    private LocalDateTime regdate;
    private Long user_id;
    private Long category;
}
