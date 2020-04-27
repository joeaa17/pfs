module Conn.View exposing (view)

import Conn.Model exposing (Model)
import Conn.Msg exposing (Msg(..))
import Element exposing (Element, column, el, row)
import Element.Events as Events
import Element.Font as Font
import Palette exposing (dropdownBg, fillWidth, h1, layout, link, linkColor)


view : Model -> List (Element Msg)
view conn =
    let
        peer =
            conn.peer

        relay =
            conn.relay

        discovered =
            String.fromInt <| List.length conn.discovered

        defn t =
            el [ Element.width (Element.fillPortion 2), Font.bold ] <| Element.text t

        valn t =
            el [ Element.width (Element.fillPortion 3) ] <| Element.text t

        relayId =
            el [ Element.width (Element.fillPortion 2) ] <|
                Element.text <|
                    Maybe.withDefault "Not Connected" <|
                        Maybe.map .id relay

        relaysSelect =
            if conn.choosing then
                [ Element.below <|
                    Element.column
                        [ dropdownBg
                        , Element.spacing 10
                        , Element.paddingXY 0 10
                        , fillWidth
                        ]
                        (List.map relaySelect conn.discovered)
                , dropdownBg
                ]

            else
                []

        relaySelect r =
            Element.el [ Events.onClick (SetRelay r) ] (Element.text r.id)

        changeRelay =
            el
                ([ Element.width (Element.fillPortion 1)
                 , linkColor
                 , Events.onMouseEnter (ChoosingRelay True)
                 , Events.onMouseLeave (ChoosingRelay False)
                 ]
                    ++ relaysSelect
                )
                (Element.text "Change")
    in
    [ column [ fillWidth, Element.spacing 10 ]
        [ row [ fillWidth ] [ defn "Peer ID:", valn peer.id ]
        , row [ fillWidth ] [ defn "Discovered peers:", valn discovered ]
        , row [ fillWidth ]
            [ defn "Relay ID:"
            , relayId
            , changeRelay
            ]
        ]
    ]
