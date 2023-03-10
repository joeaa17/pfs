module View exposing (view)

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

import Browser exposing (Document)
import Chat.View
import Element
    exposing
        ( Element
        , column
        , el
        , height
        , paragraph
        , row
        , spacing
        , text
        , textColumn
        )
import Element.Font as Font
import Element.Lazy exposing (lazy)
import Html exposing (Html)
import Ions.Font as F
import Ions.Size as S
import Model exposing (Model)
import Msg exposing (..)
import Palette exposing (fillWidth, h1, layout, layoutBlock, newTabLink, pSpacing)
import Screen.Model as Screen


view : Model -> Document Msg
view model =
    { title = title model, body = [ body model ] }


title : Model -> String
title _ =
    "Fluence chat demo app"


body : Model -> Html Msg
body model =
    layout <|
        chat model


mainmView : Model -> List (Element Msg)
mainmView model =
    case model.status of
        Model.Init ->
            [ chatConn model ]

        Model.JoinedToChat ->
            [ chatTalk model ]


chat : Model -> List (Element Msg)
chat model =
    let
        mainView =
            mainmView model
    in
    List.concat
        [ header model.screen
        , mainView
        ]


liftView :
    (Model -> model)
    -> (msg -> Msg)
    -> (model -> Element msg)
    -> (Model -> Element Msg)
liftView getModel liftMsg subView =
    \model ->
        let
            subModel =
                getModel model

            res =
                lazy subView <| subModel
        in
        Element.map liftMsg res


header : Screen.Model -> List (Element Msg)
header screenI =
    [ column (layoutBlock screenI ++ [ spacing (S.baseRem 1.125) ])
        [ row
            [ fillWidth ]
            [ paragraph [] [ h1 "P2P Application Fluence Demo" ] ]
        , row
            [ fillWidth ]
            [ paragraph [ Font.italic, F.gray, pSpacing ] <|
                [ text "P2P chat application via Fluence relay" ]
            ]
{-        , row
            [ fillWidth ]
            [ textColumn
                [ fillWidth, spacing <| S.baseRem 1 ]
                [ paragraph [ pSpacing ] [ text "This is a peer-to-peer file-sharing demo, that uses Fluence protocol to advertise and discover files, and IPFS to upload/download." ]
                , paragraph [ pSpacing ] [ text "First, choose your local file and make it discoverable via Fluence network. Other peers may discover your device as a holder of the file and ask it to provide the file to a publicly accessible IPFS node. Your device will upload the file to the IPFS node and then share its multiaddress with the requesting peer." ]
                , row [ spacing (S.baseRem 1) ] [ newTabLink "https://fluence.network" "More about Fluence", newTabLink "https://fluence.network" "Documentation" ]
                ]
            ]-}
        , el [ height <| Element.px <| S.baseRem 0.5 ] Element.none
        ]
    ]


chatConn : Model -> Element Msg
chatConn model =
    liftView .chat ChatMsg (Chat.View.connectionView model.screen) <| model


chatTalk : Model -> Element Msg
chatTalk model =
    liftView .chat ChatMsg (Chat.View.talkView model.screen) <| model
