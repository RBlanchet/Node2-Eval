{
	moment.locale('fr')
	console.log(moment().format("HH:mm:ss"))

	const vm = new Vue({
		el: '#clock-vue',
		template: `<h1>{{ time }}</h1>`,
	    data: {
	      time: moment().format("HH:mm:ss"),
	    },
	  })
}