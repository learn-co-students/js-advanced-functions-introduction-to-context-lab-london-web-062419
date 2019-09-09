// Your code here
let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployees = function (employeeRowData) {
  return employeeRowData.map(function (row) {
    return createEmployeeRecord(row)
  })
}

const createTimeInEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeInEvents.push({
    type: "TimeIn", 
    hour: parseInt(hour, 10), 
    date, 
  })
  return employee
}

const createTimeOutEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut", 
    hour: parseInt(hour, 10), 
    date, 
  })
  return employee
}

const hoursWorkedOnDate = function(employee, date) {
  let inEvent = employee.timeInEvents.find(function (e) {
    return e.date === date 
  })

  let outEvent = employee.timeOutEvents.find(function (e){
    return e.date === date
  })

  return (outEvent.hour - inEvent.hour) / 100

}

const wagesEarnedOnDate = function(employee, date) {
  let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
  return parseFloat(wage.toString())
}

const allWagesFor = function (employee) {
  let eligableDates = employee.timeInEvents.map(function (e) {
    return e.date
  })
  let payable = eligableDates.timeInEvents.map(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d)
  }, 0)
  return payable
}

let createEmployeeRecords = function (src) {
  return src.map(function (row) {
    return createEmployeeRecord(row)
  })
}

let findEmployeebyFirstName = function (srcArray, firstName) {
  return srcArray.find(function (rec) {
    return rec.firstName === firstName
  })
}

let calculatePayroll = function (records) {
  return records.reduce(function (memo, rec) {
    return memo + allWagesFor(rec)
  }, 0)
}


