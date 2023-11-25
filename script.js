submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const companyName = document.getElementById("companyName").value.trim();
  const emailList = document.getElementById("emailList");
  emailList.innerHTML = "";
  const suggestions = [
    `${firstName}.${lastName}@${companyName}`,
    `${lastName}.${firstName}@${companyName}`,
    `${firstName}@${companyName}`,
    `${lastName}@${companyName}`,
    // `${firstName.charAt(0)}${lastName}@${companyName}`,
    // `${lastName.charAt(0)}${firstName}@${companyName}`,
    // `${firstName.charAt(0)}.${lastName}@${companyName}`,
    // `${lastName.charAt(0)}.${firstName}@${companyName}`,
    // `${firstName.charAt(0)}-${lastName}@${companyName}`,
    // `${lastName.charAt(0)}-${firstName}@${companyName}`,
    // `${firstName}${lastName}@${companyName}`,
    // `${firstName}.${lastName.charAt(0)}@${companyName}`,
    // `${firstName}${lastName.charAt(0)}@${companyName}`,
  ];

  let emailCombinations = [];
  let str = ``;
  let key = "API_KEY";

  suggestions.forEach((suggestion) => {
    const listItem = document.createElement("li");
    listItem.textContent = suggestion;
    emailCombinations.push(suggestion);
    emailList.appendChild(listItem);
  });

  for (let k = 0; k < emailCombinations.length; k++) {
    let email = emailCombinations[k];
    let url = `https://api.zerobounce.net/v2/validate?api_key=${key}&email=${email}&ip_address=156.124.12.145`;
    console.log("Email validated: " + emailCombinations[k]);

    zbValidating();
    async function zbValidating() {
      try {
        let res = await fetch(url);
        let result = await res.json();
        for (key of Object.keys(result)) {
          if (key == "status") {
            str = str + `<li>${result[key]}</li>`;
            console.log(result[key]);
          }
          resultCont.innerHTML = str;
        }
      } catch (error) {
        console.error("Error validating email:", error);
      }
    }
  }
});
