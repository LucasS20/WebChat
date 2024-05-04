package com.backend.simplechat.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatMessageDTO {
    private String mensagem;
    private String user;
}
