#!/bin/bash

export TOP_GFM_DIR=`pwd`

export CVMH_SRC_PATH=$TOP_GFM_DIR/model/cvmh
export CVMH_INSTALL_PATH=$TOP_GFM_DIR/web/model/cvmh_target

if [ $PATH ] ; then
  export PATH=$CVMH_INSTALL_PATH/bin:$PATH
  else
    export $PATH==$CVMH_INSTALL_PATH
fi



