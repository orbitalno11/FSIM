// import color set
import {colorSet} from '../../Constant'

export const setupPieChart = data => {
    // require data is a json key as a label and value is data for the label
    let labels = Object.keys(data)
    let dataset = []
    let background = []
    let hoverColor = []

    for (let i in data) {
        dataset.push(data[i])
    }


    for (let i in labels) {
        background.push(colorSet[i])
        hoverColor.push(colorSet[i] + "75")
    }

    let chartData = {
        labels: labels,
        datasets: [
            {
                data: dataset,
                backgroundColor: background,
                hoverBackgroundColor: hoverColor
            }
        ]
    }

    return chartData
}

export const setupNoneStackBarChart = (receivedData) => {
    // require data is a json key as a label and value is data for the label
    let label = Object.keys(receivedData)
    let dataset = []

    let dataList = []
    let background = []
    let hoverColor = []
    for (let index in label) {
        dataList.push(receivedData[label[index]])
        background.push(colorSet[index])
        hoverColor.push(colorSet[index] + "75")
    }
    dataset.push({
        backgroundColor: background,
        hoverBackgroundColor: hoverColor,
        data: dataList
    })

    return {
        labels: label,
        datasets: dataset
    }
}

export const setupStackBarChart = (receivedData) => {
    // require data is a json key as a label and value is data for the label
    let label = Object.keys(receivedData)
    let dataset = []

    let sub_label
    let cur_size = 0

    for (let key in receivedData) {
        let temp = receivedData[key]
        let key_per = Object.keys(temp)

        if (key_per.length > cur_size) {
            cur_size = key_per.length
            sub_label = key_per
        }
    }

    for (let i in sub_label) {
        let inner = {
            label: sub_label[i],
            data: []
        }
        dataset.push(inner)
    }

    for (let i in receivedData) {
        let data = receivedData[i]
        let key = Object.keys(data)


        for (let j in sub_label) {
            if (key[j] === undefined) {
                dataset[j].data.push(0)
                continue
            }
            dataset[j].data.push(parseInt(data[key[j]]))
        }
    }

    for (let i in dataset) {
        dataset[i].backgroundColor = colorSet[i]
    }

    return {
        labels: label,
        datasets: dataset
    }
}