package com.ragtag.boardhub.DTO.userDTO;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
//사용자 권한 enum
public enum Role {
    USER("ROLE_USER"), ADMIN("ROLE_ADMIN");
    private final String value;
}
