import React from 'react';
import ReactDOM from 'react-dom';
import {
  EmbeddablePanel,
  embeddableFactories,
} from '../../../src/legacy/core_plugins/embeddable_api/public';
import { I18nContext } from 'ui/i18n';

import { EmbeddableFactoriesRegistryProvider } from 'ui/embeddable/embeddable_factories_registry';
import Private from 'ui/private';
import { uiModules } from 'ui/modules';

const embeddableRenderer = () => ({
  name: 'embeddable',
  displayName: 'Embeddable',
  help: 'Render embeddable',
  reuseDomNode: true,
  render: async (domNode, config, handlers) => {
    const m = uiModules;
    console.log(m);
    console.log(EmbeddableFactoriesRegistryProvider);

    const helloFactory = embeddableFactories.get('HELLO_WORLD_EMBEDDABLE_TYPE');
    const embeddable = await helloFactory.create({ id: 'hello' });

    const renderEmbeddable = () => (
      <div style={{ width: domNode.offsetWidth, height: domNode.offsetHeight }}>
        <I18nContext>
          <EmbeddablePanel embeddable={embeddable} />
        </I18nContext>
      </div>
    );

    ReactDOM.render(renderEmbeddable(), domNode, () => handlers.done());

    handlers.onResize(() => {
      ReactDOM.render(renderEmbeddable(), domNode, () => handlers.done());
    });

    handlers.onDestroy(() => ReactDOM.unmountComponentAtNode(domNode));
  },
});

export { embeddableRenderer };
