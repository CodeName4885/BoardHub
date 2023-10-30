package com.ragtag.boardhub.DTO;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

// 이미지 저장경로 및 uuid 이름 변경해주는 클래스
@Component
@Slf4j
public class ImgUpload {
    @Value("${file.dir}")
    private String fileDir;

    public List<Images> saveFiles(List<MultipartFile> multipartFiles) throws IOException {
        log.info("saveFiles multipartFiles = {}", multipartFiles);
        List<Images> fileList = new ArrayList<>();
        for(MultipartFile mf : multipartFiles){
            if(!mf.isEmpty()){
                fileList.add(saveFile(mf));
            }
        }
        return fileList;
    }


    public Images saveFile(MultipartFile mf) throws IOException {
        if(mf.isEmpty()){
            return null;
        }
        String orgFileName = mf.getOriginalFilename();
        log.info("orgFileName = {}", orgFileName);
        String storedFileName = makeFileName(orgFileName);
        log.info("storedFileName = {}", storedFileName);
        mf.transferTo(new File(getFilePath(storedFileName)));
        return new Images(orgFileName, storedFileName);
    }



    public String getFilePath(String fileName){
        return fileDir + fileName;
    }
    private String makeFileName(String orgFileName) {
        String ext = extractExt(orgFileName);
        String uuid = UUID.randomUUID().toString();
        return uuid + ext;
    }

    private String extractExt(String orgFileName) {
        int idx = orgFileName.lastIndexOf(".");
        String ext = orgFileName.substring(idx);
        return ext;
    }


}

























