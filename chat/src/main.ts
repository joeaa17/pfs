import Fluence from "fluence/dist/fluence";

import {createChat, currentChat, joinChat, publishBlueprint} from "./globalFunctions";

// change these constants in different environment
export const HISTORY_BLUEPRINT = "8bb1ecca-fcc9-4d79-8969-8c2b412ce88e";
export const USER_LIST_BLUEPRINT = "efec7c75-2b2a-4485-a89d-cc919001aa64";

// parameters from `fluence-playground` local network
export let relays = [
    {
        multiaddr: "/ip4/134.209.186.43/tcp/9001/ws/p2p/12D3KooWEXNUbCXooUwHrHBbrmjsrpHXoEphPwbjQXEGyzbqKnE9",
        peerId: "12D3KooWEXNUbCXooUwHrHBbrmjsrpHXoEphPwbjQXEGyzbqKnE9"
    },
    {
        multiaddr: "/ip4/134.209.186.43/tcp/9002/ws/p2p/12D3KooWHk9BjDQBUqnavciRPhAYFvqKBe4ZiPPvde7vDaqgn5er",
        peerId: "12D3KooWHk9BjDQBUqnavciRPhAYFvqKBe4ZiPPvde7vDaqgn5er"
    },
    {
        multiaddr: "/ip4/134.209.186.43/tcp/9003/ws/p2p/12D3KooWBUJifCTgaxAUrcM9JysqCcS4CS8tiYH5hExbdWCAoNwb",
        peerId: "12D3KooWBUJifCTgaxAUrcM9JysqCcS4CS8tiYH5hExbdWCAoNwb"
    },
    {
        multiaddr: "/ip4/134.209.186.43/tcp/9004/ws/p2p/12D3KooWJbJFaZ3k5sNd8DjQgg3aERoKtBAnirEvPV8yp76kEXHB",
        peerId: "12D3KooWJbJFaZ3k5sNd8DjQgg3aERoKtBAnirEvPV8yp76kEXHB"
    },
    {
        multiaddr: "/ip4/134.209.186.43/tcp/9005/ws/p2p/12D3KooWCKCeqLPSgMnDjyFsJuWqREDtKNHx1JEBiwaMXhCLNTRb",
        peerId: "12D3KooWCKCeqLPSgMnDjyFsJuWqREDtKNHx1JEBiwaMXhCLNTRb"
    },
    {
        multiaddr: "/ip4/134.209.186.43/tcp/9990/ws/p2p/12D3KooWMhVpgfQxBLkQkJed8VFNvgN4iE6MD7xCybb1ZYWW2Gtz",
        peerId: "12D3KooWMhVpgfQxBLkQkJed8VFNvgN4iE6MD7xCybb1ZYWW2Gtz"
    },
    {
        multiaddr: "/ip4/134.209.186.43/tcp/9100/ws/p2p/12D3KooWPnLxnY71JDxvB3zbjKu9k1BCYNthGZw6iGrLYsR1RnWM",
        peerId: "12D3KooWPnLxnY71JDxvB3zbjKu9k1BCYNthGZw6iGrLYsR1RnWM"
    }
]

export const CHAT_PEER_ID = relays[1].peerId;

Fluence.setLogLevel('error')

console.log(`
Welcome to Fluence Demo Chat Application
Use this commands to start:
// create a new chat instance and print your seed and new chat id
let chat = await createChat("Your Name") 
// join to an existing chat and print your seed
let chat = await joinChat("Your Name", "Chat Id") 

// send a message to all chat members
chat.sendMessage("Your Message")
// change your name 
chat.changeName("New Name") 

// You can use your seed to reconnect to chat later or from other computer.
// You can use a specific node to connect with.
let chat = createChat("Your Name", "SEED", "Node Multiaddr")
let chat = joinChat("Your Name", "CHAT ID", "SEED", "Node Multiaddr")

// You can use preassigned node multiaddresses:
relays[0..6].multiaddr

// You can check some of used Aquamarine scripts:
chat.printSendMessageScript()
chat.printGetHistoryScript()
chat.printJoinScript()
`)





