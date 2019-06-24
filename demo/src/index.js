import mirador from 'mirador';

import { miradorAnnototEndpointPlugin } from '../../src'

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: ' https://digi.vatlib.it/iiif/MSS_Pal.lat.235/manifest.json',
    canvasIndex: 20
  }],
  annotot: {
    endpoint: 'https://spotlight.vatlib.it/annotations'
  }
}

const miradorInstance = mirador.viewer(config, [
  miradorAnnototEndpointPlugin,
]);
