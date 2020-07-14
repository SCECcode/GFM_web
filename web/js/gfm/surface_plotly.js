
// data is in stringify json blob
// x,y,z,target
function plotMaterialProperty(plotID,datastr) {

  window.console.log("calling PlotMaterialProperty..", plotID);
  if(datastr == undefined) {
    window.console.log(plotID,"ERROR, no datastr to plot with!!!\n");
    return;
  }

  var x_data=datastr["X"];
  var y_data=datastr["Y"];
  var z_data=datastr["Z"];
  var target_data=datastr["regionID"];

//  make3DSurfacePlot(x_data,y_data,target_data);
  make3DScatterPlotForRegionID(plotID,x_data,y_data,z_data,target_data);

};
