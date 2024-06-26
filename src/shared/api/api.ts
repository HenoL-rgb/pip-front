import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { userActions } from '../../modules/user/model/user.slice';

// initialize an empty api service that we'll inject endpoints into later as needed

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  async prepareHeaders(headers, _) {
    const user = localStorage.getItem('user');
    const token = user && JSON.parse(user)?.access;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | { data: any }
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    try {
      const user = localStorage.getItem('user');
      const token = user && JSON.parse(user)?.refresh;
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
        },
        api,
        extraOptions
      );
      console.log(refreshResult)

      if (refreshResult.data) {
        const data = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
          roles: string[];
        };
        localStorage.setItem(
          'user',
          JSON.stringify({
            access: data.accessToken,
            refresh: data.refreshToken,
            roles: data.roles,
          })
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        //here set true for tests
        api.dispatch(userActions.setAuthorized(false));
      }
    } catch {
      api.dispatch(userActions.setAuthorized(false));
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
