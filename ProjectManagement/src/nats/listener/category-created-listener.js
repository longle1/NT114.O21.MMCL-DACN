const natsWrapper = require('../../nats-wrapper')
const categorymodel = require('../../models/categoryModel')
const categoryCreatedListener = () => {
    const options = natsWrapper.client.subscriptionOptions()
        .setManualAckMode(true)

    const subscription = natsWrapper.client.subscribe('category:created', options)

    subscription.on('message', async (msg) => {
        if (typeof msg.getData() === 'string') {
            console.log(`Received event category:created ${msg.getSequence()}`);
            console.log("data ne", msg.getData());
            const parseData = JSON.parse(msg.getData())

            for (let category of parseData) {
                await categorymodel.create(category)
            }

            const data = await categorymodel.find({})

            console.log(data);
            msg.ack()
        }
    })
}

module.exports = categoryCreatedListener