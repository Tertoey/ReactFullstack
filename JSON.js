// const data = '[{"Timestamp":"25/09/2023 16:30:24","RSSI":"-54"},{"Timestamp":"25/09/2023 16:30:25","Temp":"400"}]';
// const dat = [{"Timestamp":"25/09/2023 16:42:54","RSSI":"-51"},{"Timestamp":"25/09/2023 16:42:54","Temp":"410"}]
// const datet = new Date();
// const dattt = datet.toISOString();

// // // Parse the JSON string into a JavaScript object
// // const data1 = JSON.parse(data);

// // // Convert the JavaScript object back to a JSON string
// // const data2 = JSON.stringify(data1);

// // // Print the type of data1 (it's an object)
// // console.log(typeof data);
// // console.log(typeof data1);

// // // Print the resulting JSON string
// // console.log(typeof data2);
// const dateString = '25/09/2023 16:42:54';
// const dateMilliseconds = Date.parse(dateString);
// console.log(dattt);


// console.log(dat[0])

const originalDateString = "25/09/2023 16:42:54";

// Split the original date string into its components
const [day, month, year, time] = originalDateString.split(/[\/\s]+/);
const [hours, minutes, seconds] = time.split(':');

// Rearrange the components to the desired format
const formattedDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

console.log(formattedDateString);
