import React from "react";
import Plot from "react-plotly.js";

const ThreeDBag = (props) => {
  const packages = props.packages;
  const currentPackage = props.currentPackage;

  var data = [
    {
      type: "mesh3d",
      alphahull: 0,
      color: "rgb(107, 255, 61)",
      flatshading: true,
      name: "case",
      showlegend: false,
      x: [0, 0, 0, 0, 39, 39, 39, 39],
      y: [33, 33, 49, 49, 33, 33, 49, 49],
      z: [34, 41, 34, 41, 34, 41, 34, 41],
    },
    {
      type: "mesh3d",
      alphahull: 0,
      opacity: 0.2,
      color: "rgb(37, 240, 166)",
      flatshading: true,
      name: "case_26",
      showlegend: false,
      x: [39, 39, 39, 39, 69, 69, 69, 69],
      y: [38, 38, 52, 52, 38, 38, 52, 52],
      z: [49, 60, 49, 60, 49, 60, 49, 60],
    },
  ];

  return (
    <Plot
      className=""
      data={data}
      layout={{
        width: 350,
        height: 500,
        showlegend: false,
        autosize: true,
        margin: {
          t: 0,
          b: 0,
          l: 0,
          r: 0,
        },
        xaxis: {
          visible: false,
          zeroline: false,
        },
        yaxis: {
          visible: false,
          zeroline: false,
        },
        zaxis: {
          visible: false,
          zeroline: false,
        },
      }}
      config={{ displayModeBar: false }}
    />
  );
};

export default ThreeDBag;
