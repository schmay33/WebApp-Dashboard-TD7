const alertBanner = document.getElementById("alert");
const dot = document.getElementById("dot");
const user = document.getElementById("user");
const message = document.getElementById("message");
const send = document.getElementById("send");
const email = document.getElementById("email");
const public = document.getElementById("public");
const timezone = document.getElementById("timezone");
const save = document.getElementById("save");
const alertMenu = document.getElementById("alert-menu");
const trafficNav = document.getElementById("traffic-nav");
let storage = window.localStorage;

// run when the document is done loading
window.onload = function () {
	if (storage.email == "true") {
		email.checked = true;
	} else {
		email.checked = false;
	}
	if (storage.public == "true") {
		public.checked = true;
	} else {
		public.checked = false;
	}
	if (storage.timezone != null) {
		timezone.value = storage.timezone;
	}
};

// On save set the email, public, and timezone settings to local storage
save.addEventListener("click", function (e) {
	e.preventDefault();
	storage.setItem("email", email.checked);
	storage.setItem("public", public.checked);
	storage.setItem("timezone", timezone.value);
	alert("Settings saved!");
});

// On the user input, create an autocomplete for the list of users
user.addEventListener("input", function (e) {
	//create list of 20 users
	const search_terms = [
		"John Smith",
		"Jane Doe",
		"Roger Federer",
		"Rafael Nadal",
		"Novak Djokovic",
		"Andy Murray",
		"Tommy Haas",
		"Andy Roddick",
		"Wayne Rooney",
		"Jimmy Hendrix",
		"Bob Dole",
		"Michael Jordan",
		"Adam Silver",
		"Michael Phelps",
		"Bobby Charlton",
		"Brett Favre",
		"Bobby Brown",
	];

	res = document.getElementById("result");

	function autocompleteMatch(input) {
		if (input == "") {
			res.style.display = "none";
			return [];
		}
		var reg = new RegExp(input, "i");
		return search_terms.filter(function (term) {
			if (term.match(reg)) {
				match = true;
				return term;
			}
		});
	}

	function showResults(val) {
		res.style.display = "inherit";
		res.innerHTML = "";
		let list = "";
		let terms = autocompleteMatch(val);
		if (terms.length > 0) {
			for (i = 0; i < terms.length; i++) {
				list += "<li class='term'>" + terms[i] + "</li>";
			}
			res.innerHTML = "<ul>" + list + "</ul>";
		} else {
			res.style.display = "none";
		}
	}

	showResults(e.target.value);
});

// click anywhere but on #result hide the #result
document.addEventListener("click", function (e) {
	if (e.target.id != "result") {
		document.getElementById("result").style.display = "none";
	}
	if (e.target.classList.contains("term")) {
		user.value = e.target.innerHTML;
		document.getElementById("result").style.display = "none";
	}
});

// Add Alert Banner
alertBanner.innerHTML = `
    <div class="alert-banner">
        <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
        <p class="alert-banner-close">x</p>
    </div>
    `;

//add event listener to the alertBanner when the button with id alert-close is clicked
alertBanner.addEventListener("click", (e) => {
	const element = e.target;
	if (element.classList.contains("alert-banner-close")) {
		alertBanner.remove();
		//if no classes with alert-banner exist
		if (document.getElementsByClassName("alert-banner").length == 0) {
			dot.classList.remove("active");
		}
	}
});

// send event listener
send.addEventListener("click", (e) => {
	// disable default form submission
	e.preventDefault();
	// ensure user and message fields are filled out
	if (user.value === "" && message.value === "") {
		alert("Please fill out user and message fields before sending");
	} else if (user.value === "") {
		alert("Please fill out user field before sending");
	} else if (message.value === "") {
		alert("Please fill out message field before sending");
	} else {
		alert(`Message successfully sent to: ${user.value}`);
	}
});

// Show alert-menu when user clicks on the bell class
dot.addEventListener("click", (e) => {
	if (alertMenu.classList.contains("active")) {
		alertMenu.classList.remove("active");
	} else {
		alertMenu.classList.add("active");
	}
});

/* -------------------- Charts ---------------------------- */
// Chart Traffic
const chartTraffic = document.getElementById("traffic-chart").getContext("2d");
// Hourly Data
const hourlyData = {
	labels: [
		"7-8am",
		"9-10am",
		"11-12am",
		"1-2pm",
		"3-4pm",
		"5-6pm",
		"7-8pm",
		"9-10pm",
		"11-12pm",
	],
	datasets: [
		{
			data: [50, 185, 140, 200, 150, 175, 125, 35, 50],
		},
	],
};
// Daily Data
const dailyData = {
	labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
	datasets: [
		{
			data: [2500, 1350, 1400, 1200, 2500, 1750, 2450],
		},
	],
};
// Weekly Data
const weeklyData = {
	labels: [
		"week 1",
		"week 2",
		"week 3",
		"week 4",
		"week 5",
		"week 6",
		"week 7",
		"week 8",
		"week 9",
	],
	datasets: [
		{
			data: [1500, 1700, 2000, 2500, 1400, 1650, 1020, 1500, 1250, 1450],
		},
	],
};
// Monthly Data
const monthlyData = {
	labels: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	],
	datasets: [
		{
			data: [
				1500, 1850, 1400, 2000, 1500, 1750, 1250, 3500, 5000, 2500,
				1100, 1340,
			],
		},
	],
};
const trafficOptions = {
	backgroundColor: "rgba(117, 119, 186, 0.5)",
	fill: true,
	aspectRatio: 2.5,
	animation: {
		duration: 0,
	},
	scales: {
		y: {
			beginAtZero: true,
        },
        x: {
            ticks: {
                autoSkip: false,
                maxRotation: 45,
                minRotation: 45
            }
        },
	},
	plugins: {
		legend: {
			display: false,
		},
	},
};
// Add Chart to the DOM
const myChart = new Chart(chartTraffic, {
	type: "line",
	data: hourlyData,
	options: trafficOptions,
});

// Chart Daily Traffic
const chartDailyTrafficElement = document
	.getElementById("daily-chart")
	.getContext("2d");
// Daily Traffic Data
const dailyTrafficData = {
	labels: ["S", "M", "T", "W", "T", "F", "S"],
	datasets: [
		{
			label: "# of Hits",
			data: [75, 115, 175, 125, 225, 200, 100],
			backgroundColor: "rgb(117, 119, 186)",
			borderWidth: 1,
		},
	],
};
// Daily Traffic Options
const dailyTrafficOptions = {
	animation: {
		duration: 0,
	},
	scales: {
		y: {
			beginAtZero: true,
		},
	},
	plugins: {
		legend: {
			display: false,
		},
	},
};
// Add Chart to the DOM
const chartDailyTraffic = new Chart(chartDailyTrafficElement, {
	type: "bar",
	data: dailyTrafficData,
	options: dailyTrafficOptions,
});

// Chart Mobile Users
const chartMobileUsersElement = document
	.getElementById("mobile-users")
	.getContext("2d");
// Mobile Users Data
const mobileUsersData = {
	labels: ["Desktop", "Tablet", "Phones"],
	datasets: [
		{
			label: "# of Votes",
			data: [2000, 550, 500],
			backgroundColor: [
				"rgb(117, 119, 186)",
				"rgb(129, 201, 143)",
				"rgb(81, 182, 200)",
			],
			borderWidth: 0,
		},
	],
};
// Mobile Users Options
const mobileUsersOptions = {
	animation: {
		duration: 0,
	},
	aspectRatio: 2,
	layout: {
		padding: 0,
	},
	plugins: {
		legend: {
			display: true,
			position: "right",
		},
		labels: {
			boxWidth: 20,
			fontStyle: "bold",
		},
	},
};
// Add Chart to the DOM
const chartMobileUsers = new Chart(chartMobileUsersElement, {
	type: "doughnut",
	data: mobileUsersData,
	options: mobileUsersOptions,
});
/* ------------------ End Charts -------------------------- */

// Add on click event listener on #traffic-nav to add and remove the active class based on what is clicked
trafficNav.addEventListener("click", (e) => {
	const element = e.target;
	const desc = e.target.innerHTML;
	if (element.classList.contains("active")) {
		// stop the function from running
		return;
	} else {
		if (desc === "Hourly") {
			myChart.data = hourlyData;
		} else if (desc === "Daily") {
			myChart.data = dailyData;
		} else if (desc === "Weekly") {
			myChart.data = weeklyData;
		} else if (desc === "Monthly") {
			myChart.data = monthlyData;
		}
		myChart.update();
	}
	// remove the active class from all elements
	trafficNav.querySelectorAll(".traffic-nav-link").forEach((element) => {
		//if classlist contains active
		if (element.classList.contains("active")) {
			//remove active class
			element.classList.remove("active");
		}
	});
	// add the active class to the element that was clicked
	element.classList.add("active");
});
