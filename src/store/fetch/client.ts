'use client';

import jsCookie from 'js-cookie';
import ky, { BeforeRequestHook } from 'ky';
import merge from 'lodash/merge';

import { kyConfigs } from '../../config/ky-config';

const cookieInterceptor: BeforeRequestHook = async (request) => {
  const token = jsCookie.get('token');
  const locale = jsCookie.get('NEXT_LOCALE');

  request.headers.set('Accept', 'application/json, text/plain, */*');

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  if (locale) {
    request.headers.set('X-Locale', locale);
    request.headers.set('accept-language', locale);
  }
};

export const clientFetch = ky.create(
  merge(JSON.parse(JSON.stringify(kyConfigs)), {
    throwHttpErrors: false,
    hooks: {
      beforeRequest: [cookieInterceptor],
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
    },
  })
);
