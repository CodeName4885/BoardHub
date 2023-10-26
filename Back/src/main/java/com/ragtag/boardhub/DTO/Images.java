package com.ragtag.boardhub.DTO;

import lombok.Data;

@Data
public class Images {
    private String fileName;
    private String orgFileName;

public Images(String orgFileName, String storedFileName) {
    this.orgFileName = orgFileName;
    this.fileName = storedFileName;
}
}
