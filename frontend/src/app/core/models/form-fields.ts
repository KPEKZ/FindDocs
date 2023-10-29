import { FormControl, FormGroup } from "@angular/forms";

export type IFormFields<T> = {
    [P in keyof T]: T[P] extends 'object' ? FormGroup<IFormFields<T[P]>> : FormControl<T[P]>;
};
