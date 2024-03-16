const natsWrapper = require('../../nats-wrapper')
const issueUpdatedListener = () => {
    const options = natsWrapper.client.subscriptionOptions()
        .setManualAckMode(true)

    const subscription = natsWrapper.client.subscribe('issue:updated', options)

    subscription.on('message', async (msg) => {
        if (typeof msg.getData() === 'string') {
            console.log(`Received event issue:updated ${msg.getSequence()}`);
            const parseData = JSON.parse(msg.getData())
            //tien hanh luu vao database sau khi lay du lieu thanh cong
            await issueModel.updateOne({ _id: parseData._id }, parseData)
            msg.ack()
        }
    })
}

module.exports = issueUpdatedListener