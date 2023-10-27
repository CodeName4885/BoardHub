package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.dto.game.GameResponse;
import com.ragtag.boardhub.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
        log.info("gameService ; {}", list);
        List<GameResponse> subList;
        if(list.size() > 4){
            subList = list.subList(0, 4);
        }else {
            subList = list;
        }
        return ResponseEntity.ok(subList);
    }
}
