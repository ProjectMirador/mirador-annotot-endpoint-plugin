import React, { Component, Fragment } from 'react'
import mirador from 'mirador';

class MiradorAnnototEndpoint extends Component {
  render() {
    const { TargetComponent, canvas, config, receiveAnnotation } = this.props;
    if (canvas) {
      const url = new URL(`${config.annotot.endpoint}/lists`);
      const params = {
        uri: canvas.id,
      };
      url.search = new URLSearchParams(params);
      fetch(url, {
        method: 'GET',
      }).then(res => res.json())
        .then((results) => {
          receiveAnnotation(canvas.id, results['@id'], results);
      }, (error) => {
        console.log(error);
      });
    }

    return <TargetComponent {...this.props.targetProps} />;
  }
}

function mapStateToProps(state, { targetProps }) {
  return {
    canvas: mirador.selectors.getSelectedCanvas(state, { windowId: targetProps.windowId }),
    config: state.config,
  };
};

const mapDispatchToProps = {
  receiveAnnotation: mirador.actions.receiveAnnotation
};

export default {
  target: 'WindowCanvasNavigationControls',
  mode: 'wrap',
  component: MiradorAnnototEndpoint,
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
}
