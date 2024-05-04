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
        System.out.println(messageDTO);
        return new ChatMessageDTO(messageDTO.getMensagem(), messageDTO.getUser());
    }

}
