/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongodb = require('mongodb');

function createClient(_x, _x2) {
  return _createClient.apply(this, arguments);
}

function _createClient() {
  _createClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(host, port) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var MongoClient = mongodb.MongoClient;
              var url = "mongodb://".concat(host, ":").concat(port);
              MongoClient.connect(url,
              /*{useUnifiedTopology: true },*/
              function (err, client) {
                if (err) {
                  reject(err);
                } else {
                  resolve(client);
                }
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createClient.apply(this, arguments);
}

;
/*

async function createCollection (client, dbname, collectionName) {
    return new Promise((resolve, reject) => {
     
        dbo.createCollection (collectionName, (err, resultCollection) => {
            if (err != null) {
                reject(err);
            } else {
                resolve({...dbControl, collection: resultCollection});
            }
        });
    });
};
*/

function addDocument(_x3, _x4) {
  return _addDocument.apply(this, arguments);
}

function _addDocument() {
  _addDocument = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dbCollection, doc) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var collection = dbCollection.collection;
              var d = new Date();
              var etime = d.toISOString();
              console.log(etime);

              var newDoc = _objectSpread({}, doc, {
                _timeStamp: etime
              });

              collection.insertOne(newDoc, function (err, res) {
                if (err) {
                  reject(err);
                } else {
                  resolve('Record saved');
                }
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _addDocument.apply(this, arguments);
}

function findDocuments(_x5, _x6) {
  return _findDocuments.apply(this, arguments);
}

function _findDocuments() {
  _findDocuments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dbCollection, endTime) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              var collection = dbCollection.collection;
              var query = {
                _timeStamp: {
                  $lte: endTime
                }
              };
              collection.find(query, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _findDocuments.apply(this, arguments);
}

function removeDocuments(_x7, _x8) {
  return _removeDocuments.apply(this, arguments);
}

function _removeDocuments() {
  _removeDocuments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dbCollection, endTime) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              var collection = dbCollection.collection;
              var query = {
                _timeStamp: {
                  $lte: endTime
                }
              };
              collection["delete"](query, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  resolve("".concat(result.result.n, " documents deleted"));
                }
              });
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _removeDocuments.apply(this, arguments);
}

module.exports = {
  createClient: createClient,
  addDocument: addDocument,
  findDocuments: findDocuments,
  removeDocuments: removeDocuments
};