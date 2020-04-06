import mirador from 'mirador';

import { miradorAnnototEndpointPlugin } from '../../src'

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: ' https://cdm16079.contentdm.oclc.org/iiif/info/p16079coll32/125688/manifest.json',
  }],
  window: {
    defaultSideBarPanel: 'annotations',
    sideBarOpenByDefault: true,
  },
  annotot: {
    endpoint: 'https://annotot-app.herokuapp.com/annotations'
  }
}

const miradorInstance = mirador.viewer(config, [
  miradorAnnototEndpointPlugin,
]);
