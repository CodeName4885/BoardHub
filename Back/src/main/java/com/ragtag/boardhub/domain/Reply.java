package com.ragtag.boardhub.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Reply {
    private Long reply_id;
    private Long r_group;
    private Long r_step;
    private Long r_level;
    private String content;
    private Long user_id;
    private Long comm_id;
    private LocalDateTime regdate;

}
