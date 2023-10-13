package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.domain.Games;
import com.ragtag.boardhub.dto.GameSortDTO;
import com.ragtag.boardhub.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/game")
@RequiredArgsConstructor
@Slf4j
public class GameController {

    private final GameService gameService;

    @ResponseBody
    @PostMapping(value = "list", consumes = "application/json")
    public ResponseEntity<List<Games>> gameList(@RequestBody GameSortDTO sort) {
        log.info("sort : {}", sort);
        List<Games> list = new ArrayList<>();
        if(sort.getTab() == 3 && sort.getCategory() > 0) {
            list = gameService.getListWithSort(sort);
        } else {
            list = gameService.getList();
        }
        log.info("list : {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


}
