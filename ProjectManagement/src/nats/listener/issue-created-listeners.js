const natWrapper = require("../../nats-wrapper")

const issueCreatedListener = () => {
    const options = natWrapper.client.subscriptionOptions()
        .setManualAckMode(true)

    const subscription = natWrapper.client.subscribe('issue:created', options)

    subscription.on('message', (msg) => {
        const data = msg.getData()

        if (typeof data === 'string') {
            console.log(`Received event ${msg.getSequence()}, with data ${data}`);

            msg.ack()
        }
    })
}

module.exports = issueCreatedListener