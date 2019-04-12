import mirador from 'mirador';

import { miradorAnnototEndpointPlugin } from '../../src'

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: 'https://digi.vatlib.it/iiif/MSS_Arch.Cap.S.Pietro.D.182/manifest.json',
    canvasIndex: 583
  }],
}

const miradorInstance = mirador.viewer(config, [
  miradorAnnototEndpointPlugin,
]);
