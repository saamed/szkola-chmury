const AWS = require('aws-sdk')

const ec2 = new AWS.EC2()
const autoScaling = new AWS.AutoScaling();

const ec2Request = {
    Filters: [
        {
            Name: "tag:ENV",
            Values: ["TEST"]
        }
    ]
}

exports.handler = async function (event, context) {
    let actionName = event.action;
    let action;

    if (actionName === 'turnOn') {
        ec2Request.Filters.push({
            Name: 'instance-state-name',
            Values: ['stopped']
        });

        action = (instances) => ec2.startInstances({ InstanceIds: instances }).promise();
    }
    else if (actionName === 'turnOff') {
        ec2Request.Filters.push({
            Name: 'instance-state-name',
            Values: ['running']
        });
        action = (instances) => ec2.stopInstances({ InstanceIds: instances }).promise();
    } else {
        return;
    }

    await ec2.describeInstances(ec2Request).promise()
        .then(data => {
            return data.Reservations.map(x => x.Instances).reduce((total, c) => total.concat(c), []).map(x => x.InstanceId);
        }, error => {
            console.log(error);
        }).then(instances => {
            return action(instances);
        }).catch(error => {
            console.log(error);
        });
}