import type { OpenAPIV3 } from 'openapi-types';
import { SanitizedGlobalConfig } from 'payload/types';
import { SanitizedConfig } from 'payload/config';
import { Options } from '../../../options';
import { basicParameters } from '../../../base-config';
import { createRef, createRequestBody, createResponse, createUpsertConfirmationSchema, entityToSchema } from '../../../schemas';
import { getDescription, merge } from '../../../utils';
import { getCustomPaths } from '../custom-paths';
import { getRouteAccess } from '../../route-access';

export const getGlobalRoutes = async (
  global: SanitizedGlobalConfig,
  options: Options,
  payloadConfig: SanitizedConfig,
): Promise<Pick<Required<OpenAPIV3.Document>, 'paths' | 'components'>> => {
  const description = getDescription(global);

  const paths: OpenAPIV3.PathsObject = {
    [`/globals/${global.slug}`]: {
      get: {
        summary: description,
        description,
        tags: [`global ${global.slug}`],
        security: await getRouteAccess(global, 'read', options.access),
        parameters: basicParameters,
        responses: {
          '200': createRef(global.slug, 'responses'),
        },
      },
      post: {
        summary: `Updates the ${global.slug}`,
        description: `Updates the ${global.slug}`,
        tags: [`global ${global.slug}`],
        security: await getRouteAccess(global, 'update', options.access),
        parameters: basicParameters,
        requestBody: createRef(global.slug, 'requestBodies'),
        responses: {
          '200': createRef(`${global.slug}UpsertConfirmation`, 'responses'),
        },
      },
    },
  };
  const components: OpenAPIV3.ComponentsObject = {
    schemas: {
      [global.slug]: await entityToSchema(payloadConfig, global),
      [`${global.slug}UpsertConfirmation`]: createUpsertConfirmationSchema(global.slug),
    },
    requestBodies: {
      [`${global.slug}Request`]: createRequestBody(global.slug),
    },
    responses: {
      [`${global.slug}Response`]: createResponse('ok', global.slug),
      [`${global.slug}UpsertConfirmationResponse`]: createResponse('ok', `${global.slug}UpsertConfirmation`),
    },
  };

  const customRoutes = getCustomPaths(global, 'global');

  return merge({ paths, components }, customRoutes);
};
