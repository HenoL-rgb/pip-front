import { api } from '../../../../shared/api/api';
import { userActions } from '../../../user/model/user.slice';

export const loginApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (arg, api) => {
        const { data } = await api.queryFulfilled;
        console.log(data);
        api.dispatch(userActions.setAuthorized(true));
        // api.dispatch(
        //   userActions.setAuthData({
        //     name: 'jopa',
        //   })
        // );
        localStorage.setItem(
          'user',
          JSON.stringify({
            access: data.accessToken,
            refresh: data.refreshToken,
            roles: data.roles,
          })
        );
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;
