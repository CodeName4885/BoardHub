package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.DTO.game.*;
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
    @GetMapping(value = "list", consumes = "application/json")
    public ResponseEntity<List<GameResponse>> getGameList(@RequestParam("tab") int tab, @RequestParam("cat") int category) {
        GameSortDTO sort = new GameSortDTO(tab, category);
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
    public ResponseEntity<GameResponse> getGameDetail(@PathVariable("id") Long gameId) {
        log.info("gameId : {}", gameId);
        GameResponse game = gameService.findGameById(gameId);

        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @ResponseBody
    @PutMapping(value = "{id}", consumes = "application/json")
    public ResponseEntity<GameResponse> putGame(@PathVariable("id") Long gameId, @RequestBody GameForm form) {
        log.info("gameId : {}", gameId);
        log.info("form : {}", form);
        boolean result = gameService.updateGame(form);
        if(result) {
            gameService.mappingData(form);
        }
        return null;
    }


    @ResponseBody
    @PostMapping(value = "create")
    public ResponseEntity<GameResponse> createGame(@RequestBody GameForm form) {
        log.info("form : {}", form);
//        boolean result = gameService.createGame(form);
        return null;
    }

    @ResponseBody
    @GetMapping("categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> list = gameService.getCategoryList();
        log.info("list: {}", list);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("{id}/category")
    public ResponseEntity<List<CategoryDTO>> getCategories(@PathVariable("id") Long gameId) {
        List<CategoryDTO> cateList = gameService.getCategoriesByGameId(gameId);
        log.info("Categories : {}", cateList);
        return new ResponseEntity<>(cateList, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("{id}/mechanic")
    public ResponseEntity<List<CategoryDTO>> getMechanics(@PathVariable("id") Long gameId) {
        List<CategoryDTO> cateList = gameService.getCategoriesByGameId(gameId);
        log.info("Categories : {}", cateList);
        return new ResponseEntity<>(cateList, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("data")
    public ResponseEntity<GameDataDTO> getAllData() {
        GameDataDTO allData = gameService.getAllDataList();
        log.info("allData: {}", allData);

        return new ResponseEntity<>(allData, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("data/{id}")
    public ResponseEntity<GameDataDTO> getAllDataByGameId(@PathVariable("id") Long gameId) {
        GameDataDTO allData = gameService.getAllDataByGameId(gameId);
        log.info("allData: {}", allData);

        return new ResponseEntity<>(allData, HttpStatus.OK);
    }

}
