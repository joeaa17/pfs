import {convertRelayForELM} from "./utils";
import {chatHandler} from "./chat";

interface Peer {
    id: string,
    privateKey?: string
}

export interface Relay {
    host?: string,
    pport: number,
    peer: Peer,
    dns?: string
}

export function getRelays() {
    return relays1;
}

export function peerErrorEvent(errorMsg: string) {
    getApp().ports.connReceiver.send({event: "error", relay: null, peer: null, errorMsg});
}

export interface ElmRelay {
    peer: Peer,
    host: string,
    pport: number
}

let relays1: Relay[] = [
    {peer: {id: "12D3KooWEXNUbCXooUwHrHBbrmjsrpHXoEphPwbjQXEGyzbqKnE9", privateKey: null}, dns: "134.209.186.43", pport: 9001},
    {peer: {id: "12D3KooWHk9BjDQBUqnavciRPhAYFvqKBe4ZiPPvde7vDaqgn5er", privateKey: null}, dns: "134.209.186.43", pport: 9002},
    {peer: {id: "12D3KooWBUJifCTgaxAUrcM9JysqCcS4CS8tiYH5hExbdWCAoNwb", privateKey: null}, dns: "134.209.186.43", pport: 9003}
];

export function addRelay(app: any, relay: Relay) {
    // TODO: if the same peerId with different ip addresses?
    if (!relays1.find(r => r.peer.id === relay.peer.id)) {
        relayEvent("relay_discovered", relay)
        relays1.push(relay)
    }
}

interface RelayEvent {
    event: string,
    peer: string,
    errorMsg: string,
    relay: ElmRelay
}

export function relayEvent(name: string, relay?: Relay) {
    let relayToSend = null;
    if (relay) {
        relayToSend = convertRelayForELM(relay)
    }
    let ev: RelayEvent = {event: name, peer: null, errorMsg: null, relay: relayToSend};
    getApp().ports.connReceiver.send(ev);
}

let app: any;

// new peer is generated
export function peerEvent(name: string, peer: Peer) {
    let peerToSend: Peer = {privateKey: null, ...peer};
    getApp().ports.connReceiver.send({event: name, relay: null, errorMsg: null, peer: peerToSend});
}

export function setApp(newApp: any) {
    app = newApp
}

export function getApp(): any {
    return app;
}

export default async function ports(app: any) {

    setApp(app)

    app.ports.chatRequest.subscribe(chatHandler(app))
}
