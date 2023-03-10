module Config exposing (..)

-- Should be used to provide keys from some cache

import Conn.Relay exposing (Relay, RelayInput)


type alias Config =
    { peerId : Maybe String
    , admin: Bool
    , defaultPeerRelayInput : RelayInput
    , relays : List Relay
    , windowSize : { width : Int, height : Int }
    }


type alias Flags =
    Config
