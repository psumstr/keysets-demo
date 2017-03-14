export const getControlsCfg = (source: any) => {
  let controlsCfg = source.controlsCfg;
  let playerControlCfg = controlsCfg && controlsCfg.playerControlCfg;
  if (!controlsCfg) {
    controlsCfg = {
      timeControlCfg: null,
      playerControlCfg: {}
    };
  }
  if (source.playbackMode) {
    controlsCfg.playerControlCfg = {
      pauseAfterRead: !source.live,
      timeWindowScale: playerControlCfg.timeWindowScale
    };
    if (!source.live) {
      controlsCfg.playerControlCfg.stopTime = '$end_of_data';
    }
  }
  return controlsCfg;
};

export const getVisVariables = (source: any, template: string) => {
  return source.visualizations.filter((visualization: any) => visualization.name === template)[0].source.variables;
};

export const getSource = (sources: Array<any>, sourceName: string) => {
  return sources.filter((source) => source.name === sourceName)[0];
};
