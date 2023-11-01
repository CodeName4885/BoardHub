package com.ragtag.boardhub.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Reply {
    private Long reply_id;
    private String content;
    private Long user_id;
    private Long comm_id;
    private LocalDateTime regdate;

}
