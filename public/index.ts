/*global kbnInterpreter */

import { embeddableRenderer } from './embeddableRenderer';
import { embeddableFactories } from '../../../src/legacy/core_plugins/embeddable_api/public';
import './embeddables/factories';

// Elements show up in the Canvas elements menu and can be visually added to a canvas
const elements = [
  () => ({
    name: 'embeddable',
    displayName: 'Embeddable',
    help: 'An embeddable',
    image:
      'https://images.contentstack.io/v3/assets/bltefdd0b53724fa2ce/bltb59c89a07c05b937/5c583a6602ac90e80ba0ab8f/icon-white-circle-elastic-stack.svg',
    expression: 'embeddable',
  }),
];

// Browser functions are Canvas functions which run in the browser, and can be used in
// expressions (such as `random | metric "Random Number"`)
const browserFunctions = [
  () => ({
    name: 'embeddable',
    help: 'Render an embeddable',
    args: {
      type: {
        types: ['string'],
        required: true,
        help: 'Type of embeddable',
      },
    },
    type: 'embeddable',
    fn: async (context, { type }) => {
      return {
        type: 'embeddable',
        embeddableType: type,
      };
    },
  }),
];

const embeddableType = () => ({
  name: 'embeddable',
  to: {
    render: embeddable => {
      return {
        type: 'render',
        as: 'embeddable',
        value: {
          embeddable,
        },
      };
    },
  },
});

const types = [embeddableType];

const renderers = [embeddableRenderer];

// Register our elements and browserFunctions with the Canvas interpreter.
kbnInterpreter.register({
  elements,
  browserFunctions,
  types,
  renderers,
});
