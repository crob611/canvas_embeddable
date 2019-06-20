/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { i18n } from '@kbn/i18n';
import {
  IContainer,
  EmbeddableInput,
  embeddableFactories,
  EmbeddableFactory,
} from '../../../../src/legacy/core_plugins/embeddable_api/public';
import { EMBEDDABLE_TYPE_ONE, EmbeddableOneEmbeddable } from './embeddable1';
import { EMBEDDABLE_TYPE_TWO, EmbeddableTwoEmbeddable } from './embeddable2';

export class EmbeddableOneFactory extends EmbeddableFactory {
  public readonly type = EMBEDDABLE_TYPE_ONE;

  /**
   * In our simple example, we let everyone have permissions to edit this. Most
   * embeddables should check the UI Capabilities service to be sure of
   * the right permissions.
   */
  public isEditable() {
    return true;
  }

  public async create(initialInput: EmbeddableInput, parent?: IContainer) {
    return new EmbeddableOneEmbeddable(initialInput, parent);
  }

  public getDisplayName() {
    return i18n.translate('some.thing', {
      defaultMessage: 'Embeddable One',
    });
  }
}

export class EmbeddableTwoFactory extends EmbeddableFactory {
  public readonly type = EMBEDDABLE_TYPE_TWO;

  constructor() {
    super({
      savedObjectMetaData: {
        name: i18n.translate('xpack.maps.mapSavedObjectLabel', {
          defaultMessage: 'Map',
        }),
        type: 'map',
        getIconForSavedObject: () => 'gisApp',
      },
    });
  }

  /**
   * In our simple example, we let everyone have permissions to edit this. Most
   * embeddables should check the UI Capabilities service to be sure of
   * the right permissions.
   */
  public isEditable() {
    return true;
  }

  public async create(initialInput: EmbeddableInput, parent?: IContainer) {
    return new EmbeddableTwoEmbeddable(initialInput, parent);
  }

  public getDisplayName() {
    return i18n.translate('some.thing', {
      defaultMessage: 'Embeddable Two',
    });
  }
}

embeddableFactories.set(EMBEDDABLE_TYPE_ONE, new EmbeddableOneFactory());
embeddableFactories.set(EMBEDDABLE_TYPE_TWO, new EmbeddableTwoFactory());
