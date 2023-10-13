package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.domain.Games;
import com.ragtag.boardhub.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/game")
@RequiredArgsConstructor
@Slf4j
public class GameController {

    private final GameService gameService;

    @ResponseBody
    @PostMapping("list")
    public ResponseEntity<List<Games>> gameList() {
        List<Games> list = gameService.getList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


}
