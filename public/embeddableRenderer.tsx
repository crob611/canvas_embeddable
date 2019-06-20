import React from 'react';
import ReactDOM from 'react-dom';
import {
  EmbeddablePanel,
  embeddableFactories,
} from '../../../src/legacy/core_plugins/embeddable_api/public';
import { I18nContext } from 'ui/i18n';

const embeddableRenderer = () => ({
  name: 'embeddable',
  displayName: 'Embeddable',
  help: 'Render embeddable',
  reuseDomNode: true,
  render: async (domNode, config, handlers) => {
    const factory = embeddableFactories.get(config.embeddable.embeddableType);
    const embeddable = await factory.create({ id: 'id' });

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
