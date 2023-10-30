package com.ragtag.boardhub.domain.game;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Comments {

    private Long comment_id;
    private Long game_id;
    private Long user_id;
    private String content;
    private LocalDateTime regdate;

}
