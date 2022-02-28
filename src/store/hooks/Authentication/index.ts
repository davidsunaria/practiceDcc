import { createTypedHooks } from 'easy-peasy';
import AuthenticationModel from 'tt-frontend-model/Authentication';

const typedHooks = createTypedHooks<AuthenticationModel>();

export const authenticationActions = typedHooks.useStoreActions;
export const authenticationDispatch = typedHooks.useStoreDispatch;
export const authenticationState = typedHooks.useStoreState;
