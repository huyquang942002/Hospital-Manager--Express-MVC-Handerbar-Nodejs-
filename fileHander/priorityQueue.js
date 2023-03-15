const FastPriorityQueue = require("fastpriorityqueue")

const queue = new FastPriorityQueue((a,b)=>a.priority < b.priority)

const priorityQueueMove = (data)=>{

    data.forEach((item)=>{
        queue.add(item)
    })

    let priorityData = [];

    while (!queue.isEmpty()) {
        priorityData.push(queue.poll());
    }

    return priorityData

}

const priorityQueueRegister = (data,newData)=>{

    queue.add(newData)

    data.forEach((item)=>{
        queue.add(item)
    })

    let priorityData = [];

    while (!queue.isEmpty()) {
        priorityData.push(queue.poll());
    }

    return priorityData

}


module.exports = {
    priorityQueueMove,
    priorityQueueRegister
}