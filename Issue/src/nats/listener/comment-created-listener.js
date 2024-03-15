const commentModel = require('../../models/commentModel')
const natsWrapper = require('../../nats-wrapper')

const commentCreatedListener = () => {
    const options = natsWrapper.client.subscriptionOptions()
        .setManualAckMode(true)

    const subscription = natsWrapper.client.subscribe('comment:created', options)

    subscription.on('message',async (msg) => {
        if(typeof msg.getData() === 'string') {
            console.log(`Received event comment:created with sequence number: ${msg.getSequence()}`);

            const parseData = JSON.parse(msg.getData())

            //tiến hành lưu vào comment db
            const comment = await commentModel.create({
                _id: parseData._id,
                content: parseData.content
            })

            console.log("project management co comment ", comment);

            msg.ack()
        }
    })
}

module.exports = commentCreatedListener