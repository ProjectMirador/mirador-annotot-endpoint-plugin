import React, { Component, Fragment } from 'react'
import mirador from 'mirador';
import isEqual from 'lodash/isEqual';

class MiradorAnnototEndpoint extends Component {
  constructor(props) {
    super(props);
    this.fetchAnnotations = this.fetchAnnotations.bind(this);
  }

  fetchAnnotations(canvases) {
    const { config, fetchAnnotation } = this.props;
    canvases.forEach(canvas => {
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
            fetchAnnotation(canvas.id, results['@id'], results);
        }, (error) => {
          console.log(error);
        });
      }
    });
  }

  componentDidMount() {
    const { canvases } = this.props;
    this.fetchAnnotations(canvases);
  }

  componentDidUpdate(prevProps) {
    const { canvases } = this.props;
    const currentCanvasIds = canvases.map(canvas => canvas.id);
    const prevCanvasIds = prevProps.canvases.map(canvas => canvas.id);
    if (!isEqual(currentCanvasIds, prevCanvasIds)) {
      console.log('fetching');
      this.fetchAnnotations(canvases);
    }
  }

  render() {
    const { TargetComponent } = this.props;

    return <TargetComponent {...this.props.targetProps} />;
  }
}

function mapStateToProps(state, { targetProps }) {
  return {
    canvases: mirador.selectors.getSelectedCanvases(state, { windowId: targetProps.windowId }),
    config: state.config,
  };
};

const mapDispatchToProps = {
  fetchAnnotation: mirador.actions.fetchAnnotation
};

export default {
  target: 'WindowCanvasNavigationControls',
  mode: 'wrap',
  component: MiradorAnnototEndpoint,
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
}
