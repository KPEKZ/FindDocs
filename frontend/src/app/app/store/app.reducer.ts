import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { documentsFeatureStoreName } from "src/app/documents/store/documents.selectors";
import { documentReducer } from "src/app/documents/store/document.reducer";


export const appReducers: ActionReducerMap<AppState> = {
    [documentsFeatureStoreName]: documentReducer,
};
