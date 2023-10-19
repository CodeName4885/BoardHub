package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.dto.game.CategoryResponse;
import com.ragtag.boardhub.dto.game.GameForm;
import com.ragtag.boardhub.dto.game.GameResponse;
import com.ragtag.boardhub.dto.game.GameSortDTO;
import com.ragtag.boardhub.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<GameResponse>> gameList(@RequestBody GameSortDTO sort) {
        log.info("sort : {}", sort);
        List<GameResponse> list = new ArrayList<>();
        if(sort.getTab() == 3 && sort.getCategory() > 0) {
            list = gameService.getListWithSort(sort);
        } else {
            list = gameService.getList();
        }
        log.info("list : {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping(value = "{id}")
    public ResponseEntity<GameResponse> gameDetail(@PathVariable("id") Long gameId) {
        log.info("gameId : {}", gameId);
        GameResponse game = gameService.findGameById(gameId);

        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @ResponseBody
    @PutMapping(value = "{id}")
    public ResponseEntity<GameResponse> gameUpdate(@PathVariable("id") Long gameId, @RequestBody GameForm form) {
        log.info("gameId : {}", gameId);
        boolean result = gameService.updateGame(form);
        return null;
    }

    @ResponseBody
    @GetMapping("{id}/categories")
    public ResponseEntity<List<CategoryResponse>> getCategories(@PathVariable("id") Long gameId) {
        List<CategoryResponse> cateList = gameService.getCategoriesByGameId(gameId);
        log.info("Categories : {}", cateList);
        return new ResponseEntity<>(cateList, HttpStatus.OK);
    }

}
