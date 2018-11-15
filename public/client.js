{
  moment.locale('fr')
  console.log(moment().format("hh:mm:ss"))

 //   var formatted = moment(time, "HH:mm:ss").format("hh:mm A");
	// console.log(formatted); 

	const vm = new Vue({
	el: '#clock-vue',
	template: `<h1>{{ time }}</h1>`,
    data: {
      time: moment().format("hh:mm:ss"),
    },
  })
}