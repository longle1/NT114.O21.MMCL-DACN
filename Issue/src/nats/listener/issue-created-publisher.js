const natsWrapper = require("../../nats-wrapper")

const issueCreatedPublisher = (data) => {
    data = JSON.stringify(data)
    natsWrapper.client.publish('issue:created', data, () => {
        console.log("Event Published");
    })
}

module.exports = issueCreatedPublisher