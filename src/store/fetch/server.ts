import ky, { BeforeRequestHook } from 'ky';
import merge from 'lodash/merge';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';

import { kyConfigs } from '../../config/ky-config';

const cookieInterceptor: BeforeRequestHook = async (request) => {
  const token = (await cookies()).get('token')?.value;
  const newLocale = await getLocale();

  request.headers.set('Accept', 'application/json, text/plain, */*');

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  if (newLocale) {
    request.headers.set('X-Locale', newLocale);
    request.headers.set('accept-language', newLocale);
  }
};

export const serverFetch = ky.create(
  merge(JSON.parse(JSON.stringify(kyConfigs)), {
    hooks: {
      afterResponse: [
        async (_input: Request, _options: any, response: Response) => {
          const body = await response.json();
          if (
            body.errors ||
            (body.status !== 201 &&
              body.status !== 200 &&
              body.status !== 202 &&
              body.status !== 204)
          ) {
            throw new Error(JSON.stringify(body));
          }
        },
      ],
      beforeRequest: [cookieInterceptor],
    },
  })
);
