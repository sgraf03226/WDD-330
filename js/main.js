displayPortList();

function displayPortList()
{
	let week = 6;

	const links =
	[
		{label: "URL: Week 1 Notes",	url: "week 1/index1.html"},
		{label: "URL: Week 2 Notes",	url: "week 2/index2.html"},
		{label: "URL: Week 3 Notes",	url: "week 3/index3.html"},
		{label: "URL: Week 4 Notes",	url: "week 4/index4.html"},
		{label: "URL: Week 5 Notes",	url: "week 5/index5.html"},
		{label: "URL: Week 6 To-Do project and Notes",	url: "week 6/index6.html"},
		{label: "URL: Week 7 Notes",	url: "week 7/index7.html"},
		{label: "URL: Week 8 Notes",	url: "week 8/index8.html"},
		{label: "URL: Week 9 Notes",	url: "week 9/index9.html"},
		{label: "URL: Week 10 Notes",	url: "week 10/index10.html"},
		{label: "URL: Week 11 Report",	url: "week 11/index11.html"},
		{label: "URL: Week 13 Final",	url: "week 13/cyrptoIndex.html"}
	]

	const ol = document.getElementById('portfolioIndex');
	links.forEach(link =>
	{
		let li = document.createElement('li');
		let weekNo = link.label.substring(10, 12);
		let a = document.createElement('a');
		a.setAttribute('href', link.url);
		a.innerText = link.label;
		li.appendChild(a);
		ol.appendChild(li);
		if(weekNo <= week)
		{
			li.classList.add("liClass"); 
			a.classList.add("aClass");
		}
		else
		{
			a.classList.add("aTBDClass");   
			li.classList.add("liInactiveClass");
		}
	});

}