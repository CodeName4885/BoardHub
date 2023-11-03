package com.ragtag.boardhub.controller;

import com.ragtag.boardhub.DTO.game.*;
import com.ragtag.boardhub.domain.Review;
import com.ragtag.boardhub.domain.game.Comments;
import com.ragtag.boardhub.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
@Slf4j
public class GameController {

    private final GameService gameService;

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

    @GetMapping(value = "{id}")
    public ResponseEntity<GameResponse> getGameDetail(@PathVariable("id") Long gameId) {
        log.info("gameId : {}", gameId);
        GameResponse game = gameService.findGameById(gameId);

        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PutMapping(value = "{id}", consumes = "application/json")
    public ResponseEntity<Boolean> putGame(@PathVariable("id") Long gameId, @RequestBody GameForm form) {
        log.info("gameId : {}", gameId);
        log.info("form : {}", form);
        boolean result = gameService.updateGame(form);
        if(result) {
            gameService.mappingData(form);
        }
        return new ResponseEntity<>(result,HttpStatus.OK);
    }


    @PostMapping(value = "create")
    public ResponseEntity<GameResponse> createGame(@RequestBody GameForm form) {
        log.info("form : {}", form);
//        boolean result = gameService.createGame(form);
        return null;
    }

    @GetMapping("categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> list = gameService.getCategoryList();
        log.info("list: {}", list);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("{id}/category")
    public ResponseEntity<List<CategoryDTO>> getCategories(@PathVariable("id") Long gameId) {
        log.info("getCategories");
        List<CategoryDTO> cateList = gameService.getCategoriesByGameId(gameId);
        log.info("Categories : {}", cateList);
        return new ResponseEntity<>(cateList, HttpStatus.OK);
    }

    @GetMapping("{id}/mechanic")
    public ResponseEntity<List<CategoryDTO>> getMechanics(@PathVariable("id") Long gameId) {
        List<CategoryDTO> cateList = gameService.getCategoriesByGameId(gameId);
        log.info("Categories : {}", cateList);
        return new ResponseEntity<>(cateList, HttpStatus.OK);
    }

    @GetMapping("data")
    public ResponseEntity<GameDataDTO> getAllData() {
        GameDataDTO allData = gameService.getAllDataList();
        log.info("allData: {}", allData);

        return new ResponseEntity<>(allData, HttpStatus.OK);
    }

    @GetMapping("data/{id}")
    public ResponseEntity<GameDataDTO> getAllDataByGameId(@PathVariable("id") Long gameId) {
        GameDataDTO allData = gameService.getAllDataByGameId(gameId);
        log.info("allData: {}", allData);

        return new ResponseEntity<>(allData, HttpStatus.OK);
    }

    @GetMapping("comment/{id}")
    public ResponseEntity<List<GameComment>> getGameComments(@PathVariable("id") Long gameId) {
        List<GameComment> comments = gameService.getAllCommentByGameId(gameId);
        log.info("comments : {}", comments);
        return comments != null ? new ResponseEntity<>(comments, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("comment/{id}")
    public ResponseEntity<Integer> postGameComment(@PathVariable("id") Long gameId, @RequestBody GameComment form) {
        log.info("formdata = {}", form);
        int result = gameService.saveGameComment(form);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
