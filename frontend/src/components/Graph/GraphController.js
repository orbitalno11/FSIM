// import color set
import { colorSet } from '../../Constant'

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

export const setupNoneStackBarChart = (recievedData, graphLabel = null, isMultipleBar = false) => {
    let label = Object.keys(recievedData)
    let dataset = []

    if (isMultipleBar) {
        for (let index in label) {
            let value = {
                label: label[index],
                backgroundColor: colorSet[index],
                hoverBackgroundColor: colorSet[index] + "75",
                data: [parseFloat(recievedData[label[index]])]
            }
            dataset.push(value)
        }
    } else {
        let dataList = []
        let background = []
        let hoverColor = []
        for(let index in label){
            dataList.push(recievedData[label[index]])
            background.push(colorSet[index])
            hoverColor.push(colorSet[index] + "75")
        }
        dataset.push({
            backgroundColor: background,
            hoverBackgroundColor: hoverColor,
            data: dataList
        })
    }


    let chartData = {
        labels: label,
        datasets: dataset
    }

    return chartData
}