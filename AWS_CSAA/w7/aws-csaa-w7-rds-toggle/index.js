const AWS = require('aws-sdk')

const rds = new AWS.RDS()

exports.handler = async function (event, context) {
    let actionName = event.action;
    let identifier = event.identifier;
    let isCluster = event.isCluster;

    if (actionName === 'turnOn') {
        if (isCluster) {
            await rds.startDBCluster({ DBClusterIdentifier: identifier })
                .promise();
        }
        else {
            await rds.startDBInstance({ DBInstanceIdentifier: identifier })
                .promise();
        }
    }

    if (actionName === 'turnOff') {
        if (isCluster) {
            console.log(identifier);
            await rds.stopDBCluster({ DBClusterIdentifier: identifier })
                .promise();
        }
        else {
            await rds.stopDBInstance({ DBInstanceIdentifier: identifier })
                .promise();
        }
    }
}