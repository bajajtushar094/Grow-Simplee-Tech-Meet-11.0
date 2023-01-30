import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Source } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "whatwg-fetch";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const mbxClient = require("@mapbox/mapbox-sdk");
const baseClient = mbxClient({ accessToken: "pk.eyJ1IjoidHJpYW5ndWx1bTY2IiwiYSI6ImNsZGV6ZGxncjBpcDgzbnBmemYzOWVrOXQifQ.BpyXvqLPQHOBy_-qJJr2Vw" });
const mapService = require("@mapbox/mapbox-sdk/services/map-matching");
const mapClient = mapService(baseClient);

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoidHJpYW5ndWx1bTY2IiwiYSI6ImNsZGV6ZGxncjBpcDgzbnBmemYzOWVrOXQifQ.BpyXvqLPQHOBy_-qJJr2Vw"
});

export default class Mapviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoJsonSourceOptions: {}
    };
  }

  onDrawCreate = features => {
    let pointObjects = features.features[0].geometry.coordinates.map(item => {
      return { coordinates: item };
    });

    mapClient
      .getMatch({
        points: pointObjects,
        tidy: false,
        geometries: "geojson"
      })
      .send()
      .then(response => {
        const matching = response.body;
        if (matching.matchings.length > 0) {
          var coords = matching.matchings[0].geometry;
          let updateOjb = { ...this.state.geoJsonSourceOptions };
          updateOjb.source.data.geometry = coords;
          let id = this.drawControl.draw.getSelectedIds();
          this.drawControl.draw.delete(id);
          this.drawControl.draw.add(updateOjb.source.data);
        }
      });
  };

  componentWillUpdate(nextProps, nextState) {
    const { map, geoJsonSourceOptions } = nextState;
    if (map.getSource("source_id")) {
      map.getSource("source_id").setData(geoJsonSourceOptions.source.data);
    }
  }

  onStyleLoad = (map, e) => {
    this.setState({ map });
  };

  render() {
    return (
    <Map
        //style="mapbox://styles/jakeols/ck19qs4jl2yqt1ck09g1amjcz"
        style="mapbox://styles/mapbox/streets-v9" 
        containerStyle={{
        height: "700px",
        width: "100%"
        }}
        onStyleLoad={this.onStyleLoad}
    >
        <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15" }}
        >
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>

        <Source
        id="source_id"
        geoJsonSource={this.state.geoJsonSourceOptions.source}
        />
        <Layer type="line" id="layer_id" sourceId="source_id" />

        <DrawControl
        onDrawCreate={this.onDrawCreate}
        onDrawUpdate={this.onDrawUpdate}
        controls={{
            line_string: true,
            trash: true
        }}
        displayControlsDefault={false}
        ref={drawControl => {
            this.drawControl = drawControl;
        }}
        />
    </Map>
    );
  }
}