import {
  flowRendererV2,
  flowStyles
} from "./chunk-UPQWMTLX.js";
import {
  flowDb,
  parser$1
} from "./chunk-27H3EVDO.js";
import "./chunk-VS6P2FLT.js";
import "./chunk-AZANFNKP.js";
import "./chunk-24BPPQYO.js";
import "./chunk-YN7HKRXQ.js";
import "./chunk-RMBWCDYW.js";
import {
  require_dayjs_min,
  require_dist,
  setConfig
} from "./chunk-MHXJM7RS.js";
import {
  __toESM
} from "./chunk-PR4QN5HX.js";

// node_modules/mermaid/dist/flowDiagram-v2-6bf179d4.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-6bf179d4-SGPJ5G35.js.map
