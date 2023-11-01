package com.ragtag.boardhub.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameInfoToMain {
    private Long gameId;
    private String title;
    private String thumbnail;
    private String coment;
    private Long coment_count;
}
