import {FluenceChat} from "./fluenceChat";
import {createChat, joinChat} from "./globalFunctions";
import {getPeerId, getRelayMultiaddr} from "./connection";
import {peerIdToSeed} from "fluence/dist/seed";
import {getApp} from "./ports";

let chat: FluenceChat | undefined = undefined;

function setChat(newChat: FluenceChat) {
    chat = newChat
}

export interface ChatEvent {
    event: string,
    msg: string | null,
    name: string | null,
    relay: string | null
}

function emptyEvent(event: string): ChatEvent {
    return {event, msg: null, name: null, relay: null}
}

function createEvent(event: string, msg?: string, name?: string, relay?: string): ChatEvent {
    if (msg === undefined) { msg = null }
    if (name === undefined) { name = null }
    if (relay === undefined) { relay = null }

    return {
        event,
        msg,
        name,
        relay
    }
}

export function sendEventMessage(msg: string, name: string) {
    getApp().ports.chatReceiver.send(createEvent("new_msg", msg, name))
}

export function sendChatEvent(event: ChatEvent) {
    getApp().ports.chatReceiver.send(emptyEvent("connected"))
}

export function chatHandler(app: any) {
    return async ({command, chatId, name, msg}: {command: string, chatId?: string, name?: string, msg?: string}) => {
        switch (command) {
            case "join":
                if (!chatId) {
                    console.error("chatId should be specified on join command")
                    break;
                }

                if (!name) {
                    console.error("name should be specified on join command")
                    break;
                }

                setChat(await joinChat(name, chatId, peerIdToSeed(getPeerId()), getRelayMultiaddr()))
                sendChatEvent(emptyEvent("connected"))
                break;
            case "create":
                if (!name) {
                    console.error("name should be specified on create command")
                    break;
                }
                setChat(await createChat(name, peerIdToSeed(getPeerId()), getRelayMultiaddr()))

                sendChatEvent(emptyEvent("connected"))

                break;
            case "send_message":
                if (!msg) {
                    console.error("message should be specified on send_message command")
                    break;
                }

                await chat.sendMessage(msg);
                break;
        }

    }
}