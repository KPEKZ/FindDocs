import * as _ from "lodash";

export function isNotNill<T>(arg: T): arg is Exclude<T, undefined | null> {
    return !_.isNull(arg);
}
