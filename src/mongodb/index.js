/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let mongodb = require('mongodb');

async function createClient (host, port) {
 
    return new Promise((resolve, reject) => {
        let { MongoClient } = mongodb;
        let url = `mongodb://${host}:${port}`;
        MongoClient.connect(url, /*{useUnifiedTopology: true },*/(err, client) => {
            if (err) {
                reject(err);
            } else {
                resolve(client);
            }
        });
	});

};

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

async function addDocument (dbCollection, doc) {
    return new Promise((resolve, reject) => {
        let { collection } = dbCollection;
        let d = new Date();
        let etime = d.toISOString();
        console.log(etime);
        let newDoc = { ...doc, _timeStamp: etime };
        collection.insertOne(newDoc, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve('Record saved');
            }
        }
        );
    });
}

async function findDocuments (dbCollection, endTime) {
	return new Promise((resolve, reject) => {
        let { collection } = dbCollection;
        let query = {
            _timeStamp: { $lte: endTime }
        };
		collection.find(query, (err, result)=> {
			if (err) {
				reject(err);
            } else {
                resolve(result);
			}
		});
	});
}
async function removeDocuments (dbCollection, endTime) {
	return new Promise((resolve, reject) => {
		let { collection } = dbCollection;
		let query = {
			_timeStamp: { $lte: endTime }
		};
		collection.delete(query, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(`${result.result.n} documents deleted`);
			}
		});
	});
}

module.exports = {createClient, addDocument, findDocuments, removeDocuments };