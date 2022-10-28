const cassandra = require('cassandra-driver');
var PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
const client = new cassandra.Client({

 contactPoints: ['34.93.148.99'],

    localDataCenter: 'datacenter1',

    keyspace: 'aeps',

    authProvider: new PlainTextAuthProvider('iserveuadmin', '#$%&434isuallpermissons@12198'),

    protocolOptions: { port: 9042 }
})
module.exports=client;