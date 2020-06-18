// import axios from 'axios';
// export default async function isLogin(){
//   // ....
//   var options=null;
//   await  axios({
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: sessionStorage.getItem("token")
//         },
//         url:
//           "/bashUrl" +
//           "/smart/worker/pDic/" +
//           sessionStorage.getItem("userId") +
//           "/management",
//         data: JSON.stringify({"fieldName":"work_type"})
//       }).then(
//         res => {
//           if (res.code == 200) {
//             //  var options=[];
//              options=res.data;
//             console.log(options)
//             //  return res.data
//           }
//         }
//       );

//   return options;
//   }
// function fun(){
//   var options;
//     axios({
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: sessionStorage.getItem("token")
//     },
//     url:
//       "/bashUrl" +
//       "/smart/worker/pDic/" +
//       sessionStorage.getItem("userId") +
//       "/management",
//     data: JSON.stringify({"fieldName":"work_type"})
//   }).then(
//     res => {
//       if (res.code == 200) {
//         //  var options=[];
//         //  options=res.data;
//         console.log(res.data)
//          return res.data
//       }
//     },
//     err => {
//       return errorfun(err);
//     }
//   );

// }
// setTimeout(options,1000)
// alert("1111")
// export { fun }
var options = [
  {
    value: '010',
    label: '砌筑工'
  },
  {
    value: '020',
    label: '钢筋工'
  },
  {
    value: '030',
    label: '架子工'
  },
  {
    value: '040',
    label: '混凝土工'
  },
  {
    value: '050',
    label: '模板工'
  },
  {
    value: '060',
    label: '机械设备安装工'
  },
  {
    value: '080',
    label: '安装起重工'
  },
  {
    value: '070',
    label: '通风工'
  }
]

 export default  options

