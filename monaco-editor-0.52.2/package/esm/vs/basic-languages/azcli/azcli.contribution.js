/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/


// src/basic-languages/azcli/azcli.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "azcli",
  extensions: [".azcli"],
  aliases: ["Azure CLI", "azcli"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/azcli/azcli"], resolve, reject);
      });
    } else {
      return import("./azcli.js");
    }
  }
});
