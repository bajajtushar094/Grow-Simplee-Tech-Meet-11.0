import React from "react";
import Plot from "react-plotly.js";

const ThreeDBag = (props) => {
  const packages = props.packages;
  const currentPackage = props.currentPackage;
  const data1 = props.data;

  console.log("data1", data1);

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

  var coordinates = [];

  //generate an array of random colors in format rgb(r,g,b)
  const colors = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 256)
  );

  const randomColor = (key) => {
    let index = key % colors.length;
    return colors[index];
  };

  let orderwise_coordinates = {};

  for (var i = 0; i < data1.length; i++) {
    orderwise_coordinates[data1[i][0]] = {
      type: "mesh3d",
      alphahull: 0,
      color: randomColor(data1[i][0]),
      flatshading: true,
      name: "case",
      showlegend: false,
      x: data1[i][1],
      y: data1[i][2],
      z: data1[i][3],
    };
  }

  for (i = 0; i < packages.length; i++) {
    console.log("packages[i]", i);
    console.log("currentPackage", currentPackage);
    if (i < currentPackage) {
      let item = orderwise_coordinates[packages[i].orderId];
      item.opacity = 0.2;
      coordinates.push(item);
    } else if (i === currentPackage) {
      let item = orderwise_coordinates[packages[i].orderId];
      coordinates.push(item);
    }
  }

  console.log(coordinates);

  return (
    <Plot
      className=""
      data={coordinates}
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
