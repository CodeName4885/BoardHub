package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.DTO.GameInfoToMain;
import com.ragtag.boardhub.DTO.game.GameResponse;
import com.ragtag.boardhub.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class HomeController {
    private final GameService gameService;

    @GetMapping("/getmainitem")
    public ResponseEntity<?> getmainitem(){
        log.info("Main data response!!");
        List<GameResponse> list = gameService.getList();
        List<GameInfoToMain> newList = new ArrayList<>();
        for (int i = 0; i < 4 && i < list.size(); i++) {
            GameResponse item = list.get(i);
            GameInfoToMain newItem = new GameInfoToMain();
            newItem.setGameId(item.getGameId());
            newItem.setTitle(item.getTitle());
            newItem.setThumbnail(item.getImage());
            newItem.setComent_count(gameService.getCommentCountByGameId(item.getGameId()));
            newItem.setComent(gameService.getCommentByGameId(item.getGameId()));
            newList.add(newItem);
        }

        return ResponseEntity.ok(newList);

    }

    @GetMapping("/gethotmainitem")
    public ResponseEntity<?> getHotMainItem(){
        List<GameResponse> list = gameService.getList();
        List<GameInfoToMain> newList = new ArrayList<>();
        for (int i = 4; i < 7 && i < list.size(); i++) {
            GameResponse item = list.get(i);
            GameInfoToMain newItem = new GameInfoToMain();
            newItem.setGameId(item.getGameId());
            newItem.setTitle(item.getTitle());
            newItem.setThumbnail(item.getImage());
            newItem.setComent_count(gameService.getCommentCountByGameId(item.getGameId()));
            newItem.setComent(gameService.getCommentByGameId(item.getGameId()));
            newList.add(newItem);
        }
        return ResponseEntity.ok(newList);
    }


}

