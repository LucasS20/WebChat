package com.backend.simplechat.controller;

import com.backend.simplechat.dto.ChatMessageDTO;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessageDTO chat(@DestinationVariable String roomId, ChatMessageDTO messageDTO) {
        return new ChatMessageDTO(messageDTO.getMensagem(), messageDTO.getUser());
    }

    @MessageMapping("/chat/{roomId}/iniciarJogo")
    @SendTo("/topic/{roomId}")
    public ChatMessageDTO iniciarJogo() {
        return new ChatMessageDTO("Jogo Iniciado", "fulano");
    }

}
