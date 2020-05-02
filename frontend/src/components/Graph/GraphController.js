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
        let sub_label
        let cur_size = 0

        for(let key in recievedData){
            let temp = recievedData[key]
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

        for (let i in recievedData) {
            let data = recievedData[i]
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