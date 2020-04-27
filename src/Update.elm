module Update exposing (update)

import AddFile.Update
import Conn.Update
import Model exposing (Model)
import Msg exposing (..)


liftUpdate : (Model -> model) -> (model -> Model -> Model) -> (msg -> Msg) -> (msg -> model -> ( model, Cmd msg )) -> (msg -> Model -> ( Model, Cmd Msg ))
liftUpdate getModel setModel liftMsg up =
    \msg ->
        \model ->
            let
                m =
                    getModel model

                ( mP, mCmd ) =
                    up msg m
            in
            ( setModel mP model
            , Cmd.map liftMsg mCmd
            )


updateConn =
    liftUpdate .connectivity (\c -> \m -> { m | connectivity = c }) ConnMsg Conn.Update.update


updateAddFile =
    liftUpdate .addFile (\c -> \m -> { m | addFile = c }) AddFileMsg AddFile.Update.update


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ConnMsg m ->
            updateConn m model

        AddFileMsg m ->
            updateAddFile m model

        _ ->
            ( model, Cmd.none )
