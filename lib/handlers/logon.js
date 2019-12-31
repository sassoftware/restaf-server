"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
function logon(_x, _x2) {
  return _logon.apply(this, arguments);
}

function _logon() {
  _logon = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, h) {
    var html, indexHTML, logonHTML;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logonHTML = function _ref() {
              var html = "\n        <!DOCTYPE html>\n\n            <html lang=\"en\">\n            <!--\n            * Copyright \xA9 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.\n            * SPDX-License-Identifier: Apache-2.0\n            -->\n                <head>\n                    <meta charset=\"UTF-8\">\n                    <script src=\"https://unpkg.com/restaf@dev/dist/restaf.min.js\"></script>\n                    <script type=\"text/javascript\" src=\"/appenv\"></script>\n                    \n                    <script>\n                        function logonButton() {\n                            debugger;\n                            let store = restaf.initStore();\n                            store.logon(LOGONPAYLOAD)\n                            .then ( r => {\n                                console.log(r);\n                            })\n                            .catch( err => alert(JSON.stringify(err, null, 4)))\n                        }\n                    \n                    </script>\n                    \n                </head>\n\n                <body onload=\"logonButton()\">\n                \n                    </script>\n                </body>\n\n            </html>\n        ";
              return html;
            };

            debugger;

            if (!(process.env.AUTHFLOW === 'implicit' && process.env.REDIRECT == null)) {
              _context.next = 7;
              break;
            }

            html = logonHTML();
            return _context.abrupt("return", html);

          case 7:
            indexHTML = process.env.APPENTRY == null ? 'index.html' : process.env.APPENTRY;
            console.log("Redirecting to default ".concat(indexHTML));
            return _context.abrupt("return", h.file(indexHTML));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _logon.apply(this, arguments);
}

var _default = logon;
exports["default"] = _default;