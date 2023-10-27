package com.ragtag.boardhub.DTO.userDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SocailDTO {
    private Long user_id;
    private String email;
    private String name;
    private String profileimage;
}
