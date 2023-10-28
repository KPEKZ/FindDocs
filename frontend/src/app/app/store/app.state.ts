import { DocumentsState } from "src/app/documents/models/documents.state";
import { documentsFeatureStoreName } from "src/app/documents/store/documents.selectors";

export type AppState = Readonly<{
    [documentsFeatureStoreName]: DocumentsState;
}>;
