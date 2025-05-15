const cookieBox = document.querySelector(".wrapper");
const buttons = document.querySelectorAll(".butt");
const disc = document.querySelector("#disclaimerModal");

// cookie+disclaimer//////////////////////////////////////////////////////////////////////////////
const executeCodes = () => {
	if (!document.cookie.includes("cookie-consent")) {
		cookieBox.classList.add("show");
		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				cookieBox.classList.remove("show");
				if (button.id == "acceptBtn") {
					//cookies for 1 month 60=1min* 60=1hr* 30=30days samesitestrict only within the orignpage
					return (document.cookie = "cookieBy= ${cookie-consent}; SameSite=Strict; max-age= " + 60 * 60 * 24 * 7);
				}
			});
		});
	}
};
// theme switcher//////////////////////////////////////////////////////////////////////////////////////////
const colorThemes = document.querySelectorAll('[name="theme"]');
const storeTheme = function (theme) {
	localStorage.setItem("theme", theme);
};
const setTheme = function () {
	const activeTheme = localStorage.getItem("theme");
	colorThemes.forEach((themeOption) => {
		if (themeOption.id === activeTheme) {
			themeOption.checked = true;
		}
	});
	document.documentElement.className = activeTheme;
};
colorThemes.forEach((themeOption) => {
	themeOption.addEventListener("click", () => {
		storeTheme(themeOption.id);
		document.documentElement.className = themeOption.id;
	});
});

/// on hover theme switch////////////////////////////////////////////////////////////////////////////////
const colorOptions = document.querySelectorAll(".color-option");

colorOptions.forEach((option) => {
	option.addEventListener("mouseover", () => {
		const radioInput = option.querySelector('input[type="radio"]');
		radioInput.checked = true;
	});
});

executeCodes();
setTheme();

// database switcher
const cardHolder = document.getElementById("cardHolder");
window.currentStorageType = "session";

window.switchDatabase = async function switchDatabase() {
	console.log("Switching database");
	var select = document.getElementById("selectswitchdb");
	var selectedValue = select.value;
	const isServer = selectedValue === "server";
	const isIndexDB = selectedValue === "indexdb";
	const isSessionDB = selectedValue === "sessiondb";
	const isLocalDB = selectedValue === "localdb";

	if (isServer) {
		console.log("Switching to server database");
		const ssubmitButtonContainer = document.getElementById("dbbtn");
		const nnewSubmitButton = document.createElement("button");
		nnewSubmitButton.textContent = "Add text to Server";
		nnewSubmitButton.type = "submit";
		nnewSubmitButton.classList.add("btn-primary");
		nnewSubmitButton.id = "serversubmitbtn";
		ssubmitButtonContainer.appendChild(nnewSubmitButton);
		const showMoreButton = document.createElement("button");
		showMoreButton.type = "button";
		showMoreButton.id = "showmorec";
		showMoreButton.classList.add("btn-primary");
		showMoreButton.textContent = "MaxCard Display +2|+3";
		showMoreButton.onclick = () => showMoreCards();
		// showMoreButton.onclick = showMoreCards;  <-wrongway expects reference not a fn call cuz will send returnvalue to this btn
		// showMoreButton.addEventListener("click", showMoreCards);
		document.getElementById("buttons").appendChild(showMoreButton);
		const txtplusButton = document.createElement("button");
		txtplusButton.type = "button";
		txtplusButton.id = "zplusbtn";
		txtplusButton.classList.add("btn-primary");
		txtplusButton.textContent = "+";
		txtplusButton.onclick = () => counter.incrementFileSwitch();
		document.getElementById("zbtns").appendChild(txtplusButton);
		const txtminusButton = document.createElement("button");
		txtminusButton.type = "button";
		txtminusButton.id = "zminusbtn";
		txtminusButton.classList.add("btn-primary");
		txtminusButton.textContent = "-";
		txtminusButton.onclick = () => counter.decrementFileSwitch();
		document.getElementById("zbtns").appendChild(txtminusButton);
		coco.style.display = "none";
		dbbtn.style.display = "block";
		displ();
		document.getElementById("dbbtn").addEventListener("submit", postsensolData);
	} else if (isIndexDB) {
		console.log("Switching to IndexedDB");
		const submitButtonContainer = document.getElementById("txtbtn");
		const newSubmitButton = document.createElement("button");
		newSubmitButton.textContent = "Add text to indexDB";
		newSubmitButton.type = "submit";
		newSubmitButton.classList.add("btn-primary");
		newSubmitButton.id = "indexdbsubmitbtn";
		submitButtonContainer.appendChild(newSubmitButton);
		const wipeDBButton = document.createElement("button");
		wipeDBButton.textContent = "wipe IndexDB";
		wipeDBButton.type = "button";
		wipeDBButton.id = "wipeDBButton";
		wipeDBButton.setAttribute("onclick", "wipeData()");
		wipeDBButton.classList.add("btn-primary");
		document.getElementById("buttons").appendChild(wipeDBButton);
		coco.style.display = "none";
		txtbtn.style.display = "flex";
		ensureDatabaseConnection();
		document.getElementById("txtbtn").addEventListener("submit", handleSubmit);
	} else if (isSessionDB) {
		console.log("Switching to SessionDB");
		const sessionbtn = document.getElementById("sessionbtn");
		const newsesSubmitButton = document.createElement("button");
		newsesSubmitButton.textContent = "Add text to SessionDB";
		newsesSubmitButton.type = "submit";
		newsesSubmitButton.classList.add("btn-primary");
		newsesSubmitButton.id = "sessiondbsubmitbtn";
		sessionbtn.appendChild(newsesSubmitButton);
		coco.style.display = "none";
		txtbtn.style.display = "none";
		dbbtn.style.display = "none";
		sessionbtn.style.display = "block";
		sessionbtn.addEventListener("submit", handleSessionSubmit);
		sessionbtn.reset();
		window.currentStorageType = "session";
		displaysesCards(); // Add this line to show existing cards on switch

		// sessionStorage.setItem("user", JSON.stringify(user);// Store data
		// let value = JSON.parse(sessionStorage.getItem("user");// Retrieve data
		// sessionStorage.removeItem("key");// Remove data
		// sessionStorage.clear();// Clear all session storage data
	} else if (isLocalDB) {
		console.log("Switching to LocalDB");
		const localbtn = document.getElementById("sessionbtn"); // Reuse the same form for simplicity? Or create a new one? Let's reuse for now.
		const newlocSubmitButton = document.createElement("button");
		newlocSubmitButton.textContent = "Add text to LocalDB";
		newlocSubmitButton.type = "submit";
		newlocSubmitButton.classList.add("btn-primary");
		newlocSubmitButton.id = "localdbsubmitbtn";
		//localbtn.innerHTML = ""; // Clear previous buttons if reusing form
		localbtn.appendChild(newlocSubmitButton);
		coco.style.display = "none";
		txtbtn.style.display = "none";
		dbbtn.style.display = "none";
		localbtn.style.display = "block";
		localbtn.addEventListener("submit", handleSessionSubmit); // Reuse the same handler
		sessionbtn.reset();
		window.currentStorageType = "local"; // Set storage type
		displaysesCards(); // Display cards from localStorage
	} else {
		console.log("Invalid database selection");
	}
};

const apiEndpoints = {
	"https://db-2-cards.vercel.app": {
		joke: "/api/vercel-proxy?type=joke",
		insult: "/api/vercel-proxy?type=insult",
	},
	"http://localhost:8888": {
		joke: "/.netlify/functions/net-proxy?path=jokes",
		insult: "/.netlify/functions/net-proxy?path=insults",
	},
	"http://localhost:3000": {
		joke: "/api/vercel-proxy?type=joke",
		insult: "/api/vercel-proxy?type=insult",
	},
	"https://elegant-bubblegum-a62895.netlify.app": {
		joke: "/.netlify/functions/net-proxy?path=jokes",
		insult: "/.netlify/functions/net-proxy?path=insults",
	},
};

function getApiUrl(type) {
	const origin = window.location.origin;
	console.log("Current Origin for API lookup:", origin);
	const endpointConfig = apiEndpoints[origin];

	if (endpointConfig && endpointConfig[type]) {
		console.log(`Using endpoint for ${origin} [${type}]: ${endpointConfig[type]}`);
		return endpointConfig[type];
	} else {
		// Fallback if origin or type not found
		const fallbackUrl = `/api/vercel-proxy?type=${type}`; // Defaulting to Vercel proxy
		console.warn(`Origin '${origin}' or type '${type}' not found in apiEndpoints config. Using fallback: ${fallbackUrl}`);
		return fallbackUrl;
	}
}
document.querySelector('button[id="buon"]').addEventListener("click", async () => {
	const apiUrl = getApiUrl("joke");
	const apiiUrl = getApiUrl("insult");
	// const apiUrl = process.env.NODE_ENV === 'development'
	// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
	// const apiUrl = "https://api.adviceslip.com/advice";

	//console.log("Fetching joke from:", apiUrl); // Log the determined URL
	fetch(apiUrl)
		.then((response) => {
			if (!response.ok) throw new Error(`Joke fetch failed: ${response.statusText}`);
			return response.json();
		})
		.then((data) => {
			document.getElementById("adviceid").innerHTML = data.joke || "No joke found (YoMama API)";
		})
		.catch((error) => {
			console.error("Error fetching joke:", error);
			document.getElementById("adviceid").innerHTML = `Error: ${error.message}`;
		});

	fetch("https://icanhazdadjoke.com/", {
		headers: { Accept: "application/json" },
	})
		.then((response) => {
			if (!response.ok) throw new Error(`Dad joke fetch failed: ${response.statusText}`);
			return response.json();
		})
		.then((data) => (document.getElementById("advice").innerHTML = `${data.joke}`))
		.catch((error) => {
			console.error("Error fetching dad joke:", error);
			document.getElementById("advice").innerHTML = `Error: ${error.message}`;
		});

	//console.log("Fetching insult from:", apiiUrl); // Log the determined URL
	fetch(apiiUrl)
		.then((response) => {
			if (!response.ok) throw new Error(`Insult fetch failed: ${response.statusText}`);
			return response.json();
		})
		.then((data) => {
			document.getElementById("insult").innerHTML = data.insult || "No insult found (EvilInsult API)";
		})
		.catch((error) => {
			console.error("Error fetching insult:", error);
			document.getElementById("insult").innerHTML = `Error: ${error.message}`;
		});
});

// const apiUrl = "https://www.yomama-jokes.com/api/v1/jokes/random/";

// insult api doesnt include cors header in their server, cors-anywhere for dev testing., unless u make own server including response with cors header this wont work
// const api_Url = "https://cors-anywhere.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json";
