package com.ragtag.boardhub.domain.game;

import lombok.Data;

@Data
public class Games {

    private Long game_id;
    private String title;
    private String org_title;
    private String thumbnail;
    private String image;
    private int release_date;
    private int min_player;
    private int max_player;
    private int playing_time;
    private int min_age;

}
