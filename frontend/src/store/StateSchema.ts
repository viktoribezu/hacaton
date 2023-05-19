import { UserSchema } from "./user/UserSchema";
import { ManagementSchema } from "./management";

export interface StateSchema {
    user: UserSchema;
    management: ManagementSchema
}