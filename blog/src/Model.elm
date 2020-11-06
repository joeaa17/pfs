module Model exposing (..)

{-| Copyright 2020 Fluence Labs Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-}

import Blog.Model exposing (emptyChatModel)
import Config exposing (Config)
import Conn.Model exposing (emptyConn)
import Element
import Msg exposing (Msg(..))
import Screen.Model as Screen


type Status
    = Init
    | Connected
    | JoinedToChat


type alias Model =
    { connectivity : Conn.Model.Model
    , chat : Blog.Model.Model
    , screen : Screen.Model
    , status : Status
    }


emptyModel : Config -> ( Model, Cmd Msg )
emptyModel config =
    let
        ( emptyConnModel, cmd ) =
            emptyConn True config.defaultPeerRelayInput config.relays

        device =
            Element.classifyDevice config.windowSize
    in
    ( { connectivity = emptyConnModel
      , screen = { device = device, screenSize = config.windowSize }
      , chat = emptyChatModel
      , status = Init
      }
    , Cmd.map ConnMsg cmd
    )