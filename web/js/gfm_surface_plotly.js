
// data is in stringify json blob
// x,y,z,target
function plotMaterialProperty(plotID,datastr) {

  var x_data=datastr["X"];
  var y_data=datastr["Y"];
  var z_data=datastr["Z"];
  var target_data=datastr["regionID"];

  window.console.log("from the back...");

//  make3DSurfacePlot(x_data,y_data,target_data);
  make3DScatterPlotForRegionID(plotID,x_data,y_data,z_data,target_data);

};
