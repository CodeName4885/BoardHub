package com.ragtag.boardhub.domain;

import lombok.Data;

@Data
public class Games {

    private Long game_id;
    private Long board_game_id;
    private String title;
    private String eng_title;
    private String thumbnail;
    private String image;
    private int release_date;
    private int min_player;
    private int max_player;
    private int playing_time;
    private int min_age;

}
