package com.ragtag.boardhub.service;

import com.ragtag.boardhub.domain.game.*;
import com.ragtag.boardhub.dto.game.*;
import com.ragtag.boardhub.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    @Override
    public List<GameResponse> getList() {
        return gameRepository.getList()
                .stream()
                .map(game -> new GameResponse(game))
                .collect(Collectors.toList());
    }

    @Override
    public List<GameResponse> getListWithSort(GameSortDTO sort) {
        return gameRepository.getListWithSort(sort)
                .stream()
                .map(game -> new GameResponse(game))
                .collect(Collectors.toList());
    }

    @Override
    public GameResponse findGameById(Long gameId) {
        Games findGame = gameRepository.findGameById(gameId);
        log.info("findGame : {}", findGame);
        GameResponse game = new GameResponse(findGame);
        log.info("game : {}", game);
        return game;
    }

    @Override
    public boolean updateGame(GameForm form) {
        boolean result = gameRepository.updateGame(form.toEntity());

        return result;
    }

    @Override
    public List<CategoryDTO> getCategoriesByGameId(Long gameId) {
        return gameRepository.getCategoriesByGameId(gameId)
                .stream()
                .map(cat -> new CategoryDTO(cat))
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryDTO> getCategoryList() {
        List<Categories> findList = gameRepository.getCategoryList();
        return findList.stream()
                .map(cat -> new CategoryDTO(cat))
                .collect(Collectors.toList());
    }

    @Override
    public GameDataDTO getAllDataList() {
        List<Categories> catList = gameRepository.getCategoryList();
        List<Mechanics> mechList = gameRepository.getMechanicList();
        List<Designers> desList = gameRepository.getDesignerList();
        List<Artists> artiList = gameRepository.getArtistList();
        List<Publishers> pubList = gameRepository.getPublisherList();
        return new GameDataDTO(catList, mechList, desList, artiList, pubList);
    }

    @Override
    public void updateCategoryByGameId(Long gameId, List<CategoryDTO> list) {
        for(CategoryDTO cat : list ) {
            boolean res1 = gameRepository.updateCategoryByGameId(cat.toEntity());
            if(res1) {
                int res2 = gameRepository.checkCatMapping(gameId, cat.getCategoryId());
                if(res2 == 1) {
                    gameRepository.addCatMapping(gameId, cat.getCategoryId());
                }
            }
        }
    }

    @Override
    public GameDataDTO getAllDataByGameId(Long gameId) {
        List<Categories> catList = gameRepository.getCategoriesByGameId(gameId);
        List<Mechanics> mechList = gameRepository.getMechanicsByGameId(gameId);
        log.info("mechList: {}" , mechList);
        List<Designers> desList = gameRepository.getDesignersByGameId(gameId);
        log.info("desList: {}" , desList);
        List<Artists> artiList = gameRepository.getArtistsByGameId(gameId);
        log.info("artiList: {}" , artiList);
        List<Publishers> pubList = gameRepository.getPublishersByGameId(gameId);
        log.info("pubList: {}" , pubList);
        return new GameDataDTO(catList, mechList, desList, artiList, pubList);
    }


}
